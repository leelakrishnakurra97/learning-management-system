# 🎓 EduVerse - Enterprise Learning Management System (LMS)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748.svg)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**EduVerse** is a modern, enterprise-grade, full-stack Learning Management System designed to deliver seamless online education for K-12 and Higher Education institutions. Built with modern web technologies, EduVerse supports dynamic academic hierarchies (Boards, Classes, Subjects, Units, Chapters, Topics), automated progression tracking, interactive video streaming, live classrooms with LiveKit, AI-assisted tutoring powered by Google Gemini API, and role-based access for Students, Teachers, Admins, and Parents.

---

## 🌟 Key Features

### 👨‍🎓 1. Student Portal
- **Adaptive Learning Progression**: Sequential topic unlocking requiring mandatory watch percentages, quiz completion, and assignment submissions.
- **Video Learning Player**: Built-in video player with duration tracking, position resume, playback history, and DRM metadata support.
- **Interactive Quizzes**: Real-time quiz attempts with passing score enforcement, timed quizzes, immediate feedback, and review modes.
- **Assignments & Submissions**: File uploads, submission status tracking, and teacher feedback with grades.
- **AI Tutor Assistant**: Integrated AI learning companion powered by **Google Gemini API** for 24/7 instant homework help, topic explanations, and study assistance.
- **Gamification & Analytics**: Experience points (XP), learning streaks, completion rate badges, and personal performance dashboards.

### 👩‍🏫 2. Teacher Portal
- **Course & Content Management**: Create and structure courses, assign subjects, upload video lessons, notes, and PDF resources.
- **Quiz & Question Bank Builder**: Dynamic quiz creation with MCQs, true/false, and comprehension questions.
- **Assignment Grading Desk**: Review student submissions, assign scores, provide individual feedback, and manage pass/fail decisions.
- **Live Classroom Hosting**: Launch LiveKit-powered real-time interactive video classes with chat, attendee tracking, and whiteboard.

### 🛡️ 3. Admin Portal
- **Academic Hierarchy Configuration**: Create and manage Boards (e.g., CBSE, ICSE, State), Classes (Grade 1-12), Subjects, Units, Chapters, and Topics.
- **User & RBAC Management**: Complete role-based access control to manage users, assign custom roles, permissions, and profile parameters.
- **System Analytics**: Platform-wide metrics on student engagement, course completion, study hours, and subscription activity.
- **Subscription & Billing**: Package tier management with billing cycles (Monthly, Quarterly, Annually) and payment integration structure.

### 👨‍👩‍👧 4. Parent Portal
- **Student Performance Monitor**: Real-time progress monitoring across all enrolled subjects.
- **Attendance & Live Class Reports**: Detailed logs of live class participation and duration.
- **Gradebook & Reports**: Comprehensive scorecards for quizzes and assignments.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS & PostCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **WebRTC / Video**: LiveKit Components React (`@livekit/components-react`)

### **Backend**
- **Runtime & Server**: Node.js, Express.js (TypeScript via `tsx`)
- **Database & ORM**: PostgreSQL, Prisma ORM 6.19
- **Authentication**: JWT (JSON Web Tokens), bcryptjs password hashing
- **Object Storage**: MinIO / AWS S3 SDK (`@aws-sdk/client-s3`)
- **AI Integrations**: Google Generative AI (`@google/generative-ai` Gemini 1.5/2.0 API) & Pollinations AI
- **Live Streaming**: LiveKit Server SDK (`livekit-server-sdk`)
- **Mail Service**: Nodemailer

---

## 📁 Repository Directory & File Structure

```text
Final-LMS-Project/
├── .env.example              # Sample environment configuration file
├── .gitignore                # Git ignore rules for node_modules, build outputs, environment files
├── docker-compose.yml        # Docker Compose config for Postgres, MinIO, LiveKit services
├── eslint.config.js          # ESLint configuration
├── index.html                # Vite HTML entry point
├── package.json              # Project dependencies and npm scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.js         # PostCSS configuration for Tailwind
├── tailwind.config.js        # TailwindCSS configuration
├── tsconfig.json             # Root TypeScript configuration
├── tsconfig.app.json         # Application TypeScript configuration
├── tsconfig.node.json        # Node TypeScript configuration
├── vite.config.ts            # Vite bundler configuration
│
├── prisma/
│   ├── schema.prisma         # Complete PostgreSQL schema (20+ models & enums)
│   └── seed.ts               # Database seeder script for initial academic hierarchy & demo users
│
├── public/                   # Static assets (favicons, public images)
│
├── scripts/                  # Database setup and data generation scripts
│   ├── check-quizzes-and-topics.ts
│   ├── generate-quizzes.ts
│   ├── setup-db.ts
│   └── test-pollinations.ts
│
├── server/                   # Backend Express API Server
│   ├── index.ts              # Express server entry point & middleware mounting
│   ├── data/
│   │   └── question-bank.json# Pre-configured question bank seed dataset
│   ├── lib/
│   │   ├── db.ts             # Prisma DB client singleton instance
│   │   ├── emailService.ts   # Nodemailer email notification provider
│   │   ├── mappers.ts        # Data transformers and DTO mappers
│   │   ├── minio.ts          # S3 / MinIO client initialization & presigned URL helper
│   │   └── prisma.ts         # Secondary Prisma helper module
│   ├── middleware/
│   │   └── auth.ts           # JWT Authentication & RBAC Middleware
│   └── routes/
│       ├── academic.ts       # Board, Class, Subject, Unit, Chapter, Topic routes
│       ├── assignment.ts     # Assignment CRUD & submission endpoints
│       ├── auth.ts           # User registration, login, profile routes
│       ├── course.ts         # Course creation and listing endpoints
│       ├── live-class.ts     # LiveKit room token generation & scheduled classes
│       ├── notification.ts   # User notifications & alerts endpoints
│       ├── progress.ts       # Student topic progression tracking API
│       ├── quiz.ts           # Quiz engine endpoints (attempts, submissions, scoring)
│       ├── tutor.ts          # AI Tutor endpoints powered by Gemini API
│       └── upload.ts         # S3/MinIO presigned file upload handlers
│
└── src/                      # Frontend Application Source Code
    ├── App.css               # Application component styling
    ├── App.tsx               # Main React entry component with routing & layout wrappers
    ├── index.css             # Base Tailwind imports & custom CSS variables
    ├── main.tsx              # React DOM mounting file
    ├── vite-env.d.ts         # Vite TypeScript declaration types
    ├── assets/               # Image assets and SVGs
    ├── components/           # UI Components & Application Pages
    │   ├── AdminPortal.tsx           # Admin dashboard for user, board, class management
    │   ├── AITutor.tsx               # Interactive Gemini AI homework assistant chat UI
    │   ├── AssignmentPage.tsx        # Student assignment list & file uploader
    │   ├── CourseLearningPage.tsx    # Course viewer, video player, notes & progress bar
    │   ├── DemoPanel.tsx             # Quick multi-role switcher for demonstration
    │   ├── ForgotPasswordPage.tsx    # Password reset request view
    │   ├── GetCredentialsPage.tsx    # Demo credential helper page
    │   ├── Header.tsx                # Dynamic top navigation header
    │   ├── LandingPage.tsx           # Hero section and features marketing page
    │   ├── LoginPage.tsx             # Universal sign-in page with role detection
    │   ├── NotesResourcesPage.tsx    # Course notes & downloadable resources tab
    │   ├── ParentPortal.tsx          # Parent analytics & performance monitoring view
    │   ├── PlanetLogo.tsx            # EduVerse animated branding logo
    │   ├── QuizInterface.tsx         # Interactive quiz taker with timer and results
    │   ├── ResetPasswordPage.tsx     # Secure password reset page
    │   ├── Sidebar.tsx               # Dynamic navigation sidebar per role
    │   ├── SignupPage.tsx            # Multi-role user registration modal
    │   ├── StudentDashboard.tsx      # Main student dashboard with streak & enrolled subjects
    │   ├── StudentGradesPage.tsx     # Student grades and scorecards summary
    │   ├── StudentProfile.tsx        # Account preferences and personal profile editor
    │   ├── SubmissionsPage.tsx       # Teacher assignment submission grading page
    │   ├── TeacherDashboard.tsx      # Teacher management dashboard
    │   └── LiveClass/
    │       ├── CollaborativeWhiteboard.tsx # Real-time canvas whiteboard
    │       ├── MeetingChat.tsx             # Live meeting text chat component
    │       ├── RoomContainer.tsx           # LiveKit streaming container frame
    │       ├── SimulatedLiveMeeting.tsx    # Fallback interactive live meeting player
    │       └── ZoomMeetingLayout.tsx       # Grid view layout for video streams
    ├── data/
    │   └── question-bank.json        # Quiz options & questions repository
    ├── services/
    │   └── api.ts                    # Frontend API client library (fetch wrapper with JWT)
    ├── store/
    │   ├── curriculumData.ts         # Static curriculum fallback data
    │   ├── index.ts                  # Zustand global application state store
    │   └── types.ts                  # Core TypeScript interface definitions
    └── utils/
        ├── apiBase.ts                # API URL resolution helper
        ├── localStorage.ts           # Storage helper utilities
        └── quizGenerator.ts          # Algorithmic quiz generator logic
```

---

## ⚡ Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js** `v18.x` or `v20.x`
- **npm** `v9.x` or higher
- **PostgreSQL** database (or Docker Compose setup)

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/leelakrishnakurra97/Final-LMS-Project.git
cd Final-LMS-Project
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to create `.env`:
```bash
cp .env.example .env
```

Ensure your `.env` contains valid credentials:
```env
PORT=5000
VITE_API_URL=http://localhost:5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eduverse?schema=public"
JWT_SECRET="super-secret-jwt-key"
GEMINI_API_KEY="your-google-gemini-api-key"
```

### 4. Database Setup & Seeding
Initialize the database tables and seed initial academic structure:
```bash
# Push Prisma schema to PostgreSQL database
npm run db:push

# Seed default data (Boards, Classes, Subjects, Demo Users)
npm run db:seed
```

### 5. Running Local Development Server
Start both the Express backend server and Vite frontend client concurrently:
```bash
npm run dev
```

The application will be accessible at:
- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🐳 Docker Deployment

You can quickly spun up PostgreSQL, MinIO storage, and LiveKit services using Docker Compose:

```bash
docker-compose up -d
```

---

## 🔑 Demo Access Credentials

To test the application across different user roles, use the following credentials or use the built-in **Demo Panel** on the login page:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@eduverse.com` | `admin123` |
| **Teacher** | `teacher@eduverse.com` | `teacher123` |
| **Student** | `student@eduverse.com` | `student123` |
| **Parent** | `parent@eduverse.com` | `parent123` |

---

## 📜 Available NPM Scripts

- `npm run dev` - Launches backend server and frontend client concurrently.
- `npm run dev:client` - Runs Vite development server for frontend.
- `npm run dev:server` - Runs Express backend server with `tsx watch`.
- `npm run db:push` - Applies Prisma schema updates directly to the database.
- `npm run db:seed` - Seeds database with initial academic and user datasets.
- `npm run db:studio` - Launches Prisma Studio web GUI to browse database records.
- `npm run build` - Builds production frontend assets and verifies TypeScript types.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
