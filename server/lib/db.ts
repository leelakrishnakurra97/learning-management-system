import { existsSync } from 'fs';
import path from 'path';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';

const root = process.cwd();
const pgDir = path.join(root, '.pgdata');

async function canConnect(url: string): Promise<boolean> {
  try {
    const client = new pg.Client({ connectionString: url });
    await client.connect();
    await client.end();
    return true;
  } catch {
    return false;
  }
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

export async function startDatabase() {
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/lms_db';
  const dbParams = parseDatabaseUrl(databaseUrl);
  
  if (await canConnect(databaseUrl)) {
    console.log('Database already reachable at DATABASE_URL.');
    return;
  }

  console.log('Starting local PostgreSQL database...');
  try {
    const embedded = new EmbeddedPostgres({
      databaseDir: pgDir,
      user: dbParams.user,
      password: dbParams.password,
      port: dbParams.port,
      persistent: true,
    });
    
    if (!existsSync(pgDir)) {
      console.log('Initializing database storage...');
      await embedded.initialise();
    }
    
    await embedded.start();
    console.log('Local PostgreSQL database started successfully.');

    // Reconcile password if necessary
    if (!(await canConnect(databaseUrl))) {
      const fallbackUrl = `postgresql://${dbParams.user}:postgres@127.0.0.1:${dbParams.port}/postgres`;
      try {
        const client = new pg.Client({ connectionString: fallbackUrl });
        await client.connect();
        await client.query(`ALTER USER ${dbParams.user} WITH PASSWORD '${dbParams.password.replace(/'/g, "''")}';`);
        await client.end();
        console.log(`Successfully reconciled PostgreSQL password to match DATABASE_URL.`);
      } catch (err) {
        console.warn('Failed to reconcile postgres password (it may already match or be external):', err);
      }
    }

    // Ensure database exists
    const adminUrl = databaseUrl.replace(`/${dbParams.database}`, '/postgres');
    try {
      const client = new pg.Client({ connectionString: adminUrl });
      await client.connect();
      const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbParams.database]);
      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${dbParams.database}`);
        console.log(`Created database ${dbParams.database}`);
      }
      await client.end();
    } catch (err) {
      console.error(`Failed to ensure database ${dbParams.database} exists:`, err);
    }
    
    // Handle clean shutdown on exit
    const stopDb = async () => {
      console.log('Stopping local PostgreSQL database...');
      try {
        await embedded.stop();
      } catch (e) {
        // ignore
      }
      process.exit(0);
    };

    process.on('SIGINT', stopDb);
    process.on('SIGTERM', stopDb);
  } catch (err) {
    console.error('Failed to start local database:', err);
  }
}
