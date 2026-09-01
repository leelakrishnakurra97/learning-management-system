import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import EmbeddedPostgres from 'embedded-postgres';

const root = process.cwd();
const envPath = path.join(root, '.env');
const pgDir = path.join(root, '.pgdata');

const defaultEnv = `DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/lms_db"
PORT=3000
JWT_SECRET="eduverse-dev-secret-change-in-production"
VITE_API_URL="http://localhost:3000/api"
`;

function pgCtlPath() {
  return path.join(
    root,
    'node_modules',
    '@embedded-postgres',
    'windows-x64',
    'native',
    'bin',
    'pg_ctl.exe'
  );
}

async function canConnect(url: string): Promise<boolean> {
  try {
    const { default: pg } = await import('pg');
    const client = new pg.Client({ connectionString: url });
    await client.connect();
    await client.end();
    return true;
  } catch {
    return false;
  }
}

function startDetachedPostgres() {
  const pgCtl = pgCtlPath();
  if (!existsSync(pgCtl)) {
    throw new Error('pg_ctl not found. Run npm install first.');
  }

  spawn(pgCtl, ['-D', pgDir, '-l', path.join(pgDir, 'server.log'), 'start'], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

function parseDatabaseUrl(urlStr: string) {
  try {
    const parsed = new URL(urlStr);
    return {
      user: parsed.username || 'postgres',
      password: parsed.password || 'postgres',
      port: parseInt(parsed.port) || 5432,
      database: parsed.pathname.slice(1) || 'lms_db',
    };
  } catch (e) {
    return {
      user: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'lms_db',
    };
  }
}

async function ensureDatabase(url: string) {
  const { default: pg } = await import('pg');
  const dbParams = parseDatabaseUrl(url);
  const adminUrl = url.replace(`/${dbParams.database}`, '/postgres');
  const client = new pg.Client({ connectionString: adminUrl });
  await client.connect();
  const dbCheck = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbParams.database]);
  if (dbCheck.rowCount === 0) {
    await client.query(`CREATE DATABASE ${dbParams.database}`);
    console.log(`Created database ${dbParams.database}`);
  }
  await client.end();
}

async function ensurePostgresRunning(databaseUrl: string) {
  const dbParams = parseDatabaseUrl(databaseUrl);
  const adminUrl = `postgresql://${dbParams.user}:${dbParams.password}@127.0.0.1:${dbParams.port}/postgres`;
  if (await canConnect(databaseUrl) || await canConnect(adminUrl)) {
    console.log('Database server already reachable');
    await ensureDatabase(databaseUrl);
    return;
  }

  if (!existsSync(pgDir)) {
    console.log('Initializing embedded PostgreSQL...');
    const embedded = new EmbeddedPostgres({
      databaseDir: pgDir,
      user: dbParams.user,
      password: dbParams.password,
      port: dbParams.port,
      persistent: true,
    });
    await embedded.initialise();
    await embedded.start();
    await embedded.stop();
  }

  console.log('Starting embedded PostgreSQL in background...');
  startDetachedPostgres();

  for (let attempt = 0; attempt < 90; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (await canConnect(`postgresql://${dbParams.user}:${dbParams.password}@127.0.0.1:${dbParams.port}/postgres`) ||
        await canConnect(`postgresql://${dbParams.user}:postgres@127.0.0.1:${dbParams.port}/postgres`)) {
      break;
    }
    if (attempt === 89) {
      throw new Error('Timed out waiting for PostgreSQL to start after 90 seconds');
    }
  }

  // Reconcile password if necessary
  if (!(await canConnect(databaseUrl))) {
    const fallbackUrl = `postgresql://${dbParams.user}:postgres@127.0.0.1:${dbParams.port}/postgres`;
    try {
      const { default: pg } = await import('pg');
      const client = new pg.Client({ connectionString: fallbackUrl });
      await client.connect();
      await client.query(`ALTER USER ${dbParams.user} WITH PASSWORD '${dbParams.password.replace(/'/g, "''")}';`);
      await client.end();
      console.log(`Successfully reconciled PostgreSQL password to match DATABASE_URL.`);
    } catch (err) {
      console.warn('Failed to reconcile postgres password:', err);
    }
  }

  await ensureDatabase(databaseUrl);
  console.log(`Embedded PostgreSQL is running on port ${dbParams.port}`);
}

async function main() {
  if (!existsSync(envPath)) {
    writeFileSync(envPath, defaultEnv, 'utf8');
    console.log('Created .env file');
  }

  const envContent = readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL="([^"]+)"/);
  const databaseUrl = match?.[1] ?? 'postgresql://postgres:postgres@127.0.0.1:5432/lms_db';

  await ensurePostgresRunning(databaseUrl);

  console.log('Applying database schema...');
  execSync('npx prisma db push', { stdio: 'inherit', cwd: root });

  console.log('Seeding database...');
  execSync('npx prisma db seed', { stdio: 'inherit', cwd: root });

  console.log('Database setup complete.');
}

main().catch((error) => {
  console.error('Database setup failed:', error);
  process.exit(1);
});
