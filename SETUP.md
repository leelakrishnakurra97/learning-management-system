# Setup Guide — Nexora LMS

This document details the configuration and initialization steps for local setup and production deployments of the Nexora LMS application.

---

## 1. PostgreSQL Database Setup

Nexora LMS uses PostgreSQL as its primary relational database.

### Installation & Creation
1. Download and install PostgreSQL (v14 or higher is recommended) on your machine.
2. Configure the PostgreSQL server to listen on port **5433** (or the port specified in your `.env` file).
3. Set the default database user (`postgres`) password to `12345`.
4. Create a new database named `lms_db`:
   ```sql
   CREATE DATABASE lms_db;
   ```

### Local Embedded Fallback
If local PostgreSQL is not installed on the system, the application is equipped with an **Embedded PostgreSQL** instance which will automatically initialize, configure user/password (`postgres` / `12345`), create `lms_db` on port **5433**, and start up alongside the backend development server.

---

## 2. Environment Variables

Create a file named `.env` in the root of the project directory and fill in the values below:

```env
# Database url on port 5433
DATABASE_URL="postgresql://postgres:12345@127.0.0.1:5433/lms_db"

# Server Port
PORT=3000

# Authentication Secret
JWT_SECRET="nexora-lms-super-secret-jwt-2024"

# Client API endpoint
VITE_API_URL="http://localhost:3000/api"

# AI Tutor Integration
GEMINI_API_KEY="your-gemini-api-key-here"

# ─── MinIO (S3-compatible local object storage) ──────────────────────────────
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin123"
MINIO_BUCKET="lms-files"
MINIO_USE_SSL=false

# ─── Gmail SMTP ─────────────────────────────────────────────────────────────
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password"
SMTP_FROM="Nexora Learning <your-email@gmail.com>"
```

---

## 3. Initialization Commands

Execute the following commands in order to install dependencies, push the schema, and seed the local database:

### Step 1: Install Node Dependencies
```bash
npm install
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Run Database Migrations
Run the database migrations to build tables on PostgreSQL:
```bash
npx prisma migrate dev --name init
```
*(Alternatively, for local development, you can push the schema directly using `npx prisma db push`)*

### Step 4: Seed Initial Data
Insert dynamic boards, classes, subjects, topics, quizzes, and initial admin/teacher user credentials into the database:
```bash
npx prisma db seed
```

### Step 5: Start Development Server
```bash
npm run dev
```
The client will be running at `http://localhost:5173/` (or `http://localhost:5174/`), and the backend API at `http://localhost:3000/api`.

---

## 4. MinIO Local Configuration

Nexora LMS uses MinIO as S3-compatible local object storage to upload study notes, assignment attachments, and video lectures.

### Setup Instructions
1. Ensure your MinIO server/Docker container is running on `localhost:9000` (API) and `localhost:9001` (Console).
2. Open your browser and go to the Console: `http://localhost:9001`
3. Log in using your credentials:
   - **Username**: `minioadmin`
   - **Password**: `minioadmin123`
4. On the left sidebar, click **Buckets**.
5. Click **Create Bucket**, name it `lms-files`, and click **Create**.
6. Ensure bucket access policies permit reading files.
7. Confirm your `.env` contains the required MinIO credentials.

---

## 5. Gmail SMTP Configuration

The platform automatically sends credentials, registrations, and account notifications via Gmail SMTP.

### Setup Instructions
1. Log into your Google Account and go to **Security**.
2. Ensure **2-Step Verification** is enabled.
3. Search for or go to **App Passwords**.
4. Generate a new app password (e.g., call it "Nexora LMS").
5. Copy the generated **16-character code** (no spaces).
6. Fill in the parameters in your `.env`:
   - `SMTP_USER` = Your Gmail address (e.g., `user@gmail.com`)
   - `SMTP_PASS` = The 16-character app password (e.g., `abcd efgh ijkl mnop`)
