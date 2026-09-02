# 🎓 Learning Management System (LMS) | EduVerse

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Node.js_/_Express-4.21-000000.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-6.19-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![LiveKit](https://img.shields.io/badge/LiveKit_WebRTC-2.19-00C853.svg)](https://livekit.io/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_AI-1.5/2.0-8E44AD.svg)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED.svg)](https://www.docker.com/)

An **Enterprise-Grade, Full-Stack Learning Management System (LMS)** engineered to power modern K-12 and Higher Education platforms. Featuring a dynamic 6-tier academic curriculum hierarchy, automated sequential topic progression, interactive WebRTC video classrooms with LiveKit, 24/7 AI-assisted homework tutoring powered by **Google Gemini API**, comprehensive quiz engines, and robust 4-role Access Control (Student, Teacher, Admin).

---

## 🚀 Key Engineering Highlights

- **Full-Stack Type Safety**: Built end-to-end with **TypeScript** across client, server, ORM schema, and API contracts.
- **Dynamic Academic Hierarchy**: Fully configurable schema modeling `Board ➔ Class ➔ Subject ➔ Unit ➔ Chapter ➔ Topic`.
- **Automated Progression Engine**: Rules-based locking/unlocking enforcing mandatory video watch percentages, quiz passing scores, and assignment submissions.
- **Real-Time Live Classrooms**: Low-latency video streaming, participant tracking, live chat, and collaborative whiteboard integrated via **LiveKit WebRTC**.
- **AI-Powered Learning Assistance**: Context-aware AI homework helper and tutor powered by **Google Gemini API** (`@google/generative-ai`) and Pollinations AI image generation.
- **Enterprise Security & RBAC**: JWT-based stateless authentication with password hashing (`bcryptjs`) and granular permissions matrix for 4 distinct user personas.
- **Scalable Media Architecture**: S3/MinIO cloud object storage integration (`@aws-sdk/client-s3`) with pre-signed upload URLs and video watch history tracking.

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Layer (React 18 + Vite)                │
│   [Student Portal]   [Teacher Portal]   [Admin Center]   [Parent View] │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTP / REST APIs + WebSockets
┌────────────────────────────────────▼────────────────────────────────────┐
│                    Backend API Server (Express + TypeScript)            │
│   ├── JWT Auth & RBAC Middleware                                        │
│   ├── Academic & Course Service Routes                                  │
│   ├── Progression Logic Engine & Quiz Evaluator                         │
│   ├── Gemini AI Tutor Integration Layer                                 │
│   └── LiveKit WebRTC Token Provider                                     │
└──────────────┬─────────────────────┬─────────────────────┬──────────────┘
               │                     │                     │
               ▼                     ▼                     ▼
┌───────────────────────────┐ ┌─────────────┐ ┌──────────────────────────┐
│  PostgreSQL + Prisma ORM  │ │ LiveKit RTC │ │ MinIO / AWS S3 Storage   │
│  (20+ Relational Models)  │ │ Streaming   │ │ (Notes, Resources, PDFs) │
└───────────────────────────┘ └─────────────┘ └──────────────────────────┘
```

---

## 🌟 Role-Based Persona Features

### 👨‍🎓 1. Student Learning Hub
- **Interactive Course Player**: Video lesson streaming with playback position auto-resume, completion rate tracking, downloadable PDF notes, and supplementary resources.
- **Adaptive Topic Unlock Pipeline**: Topics automatically unlock as prerequisite criteria (video watch %, quiz score, assignment submission) are satisfied.
- **Timed Quiz Engine**: Multiple-choice, multi-select, true/false, and comprehension questions with timer enforcement, instant feedback, and attempt history.
- **AI Homework Assistant**: Integrated 24/7 AI tutor for step-by-step math problem solving, concept explanations, and instant feedback.
- **Gamification & Analytics**: Experience Points (XP), daily streak counters, completion badges, and performance scorecards.

### 👩‍🏫 2. Teacher Command Center
- **Course & Lesson Authoring**: Upload course modules, attach video URLs, assign notes, and set prerequisites.
- **Question Bank & Quiz Builder**: Create dynamic assessment quizzes with customizable passing marks, max attempts, and question ordering.
- **Submission Grading Desk**: Review student assignment uploads, assign numerical grades, toggle pass/fail status, and write personalized feedback.
- **Live Meeting Host**: Schedule, launch, and host interactive live classes with student attendance logs, meeting chat, and collaborative whiteboard.

### 🛡️ 3. Admin Command Center
- **Curriculum Hierarchy Management**: Configure Boards (e.g., CBSE, ICSE, State), Classes (Grade 1-12), Subjects, Units, Chapters, and Topics dynamically.
- **User & RBAC Administration**: Complete user management, role assignments, permissions configuration, and user status toggling.
- **Platform Analytics**: Institution-wide metric monitoring including active enrollment, total study hours, course completion rates, and subscription revenues.
- **Subscription & Billing**: Package tier management with billing frequency configuration (Monthly, Quarterly, Annually) and payment gateways (Razorpay/Stripe).

### 👨‍👩‍👧 4. Parent Monitoring Portal
- **Child Academic Progress Tracking**: Real-time visibility into enrolled subjects, overall completion percentage, and active learning streaks.
- **Live Class Attendance Logs**: Attendance verification detailing live class joining times and total participation duration.
- **Performance Reports**: View quiz scorecards, assignment feedback, and subject-wise strength/weakness analytics.

---

## 📁 Repository & File Structure

```text
learning-management-system/
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusion rules
├── docker-compose.yml        # Docker setup for Postgres, MinIO, and LiveKit services
├── eslint.config.js          # ESLint code quality rules
├── index.html                # Vite HTML application entry point
├── package.json              # Project dependencies and script declarations
├── package-lock.json         # Dependency tree lock file
├── postcss.config.js         # PostCSS configuration for Tailwind
├── tailwind.config.js        # TailwindCSS utility theme configuration
├── tsconfig.json             # Root TypeScript compiler options
├── tsconfig.app.json         # Frontend TypeScript configuration
├── tsconfig.node.json        # Node execution environment TS configuration
├── vite.config.ts            # Vite build pipeline & server proxy settings
├── IMPLEMENTATION_GUIDE.md   # Architectural implementation details
├── QUICKSTART.md             # Developer quickstart reference
├── README.md                 # Master project documentation
├── SETUP.md                  # Detailed environment setup guide
│
├── prisma/
│   ├── schema.prisma         # PostgreSQL Prisma schema (20+ models & enums)
│   └── seed.ts               # Database seed script for default curriculum & demo users
│
├── public/                   # Public static assets & PDF reference notes
│   ├── Class12_Chemistry_Vol1_Ch1_Notes.pdf
│   ├── Class12_Maths_Vol1_Ch1_Notes.pdf
│   ├── Class12_Physics_Vol1_Ch1_Notes.pdf
│   ├── biology.png
│   ├── chemistry.png
│   ├── favicon.svg
│   ├── feat_ai_tutor.png
│   ├── feat_expert_notes.png
│   ├── feat_webrtc.png
│   ├── maths.png
│   ├── physics.png
│   └── science.png
│
├── scripts/                  # Database management & utility scripts
│   ├── check-quizzes-and-topics.ts
│   ├── generate-quizzes.ts
│   ├── setup-db.ts
│   └── test-pollinations.ts
│
├── server/                   # Express REST API Server
│   ├── index.ts              # Express server initialization & middleware mounting
│   ├── data/
│   │   └── question-bank.json# Pre-seeded assessment questions bank
│   ├── lib/
│   │   ├── db.ts             # Prisma DB client singleton
│   │   ├── emailService.ts   # Nodemailer transactional email module
│   │   ├── mappers.ts        # DTO data mapper functions
│   │   ├── minio.ts          # S3 / MinIO storage integration helper
│   │   └── prisma.ts         # Prisma context helper
│   ├── middleware/
│   │   └── auth.ts           # JWT Authentication & RBAC enforcement middleware
│   └── routes/
│       ├── academic.ts       # Board, Class, Subject, Unit, Chapter, Topic management APIs
│       ├── assignment.ts     # Assignment CRUD & submission endpoints
│       ├── auth.ts           # User sign-in, registration & profile management
│       ├── course.ts         # Course creation & enrollment endpoints
│       ├── live-class.ts     # LiveKit token generation & live meeting scheduler
│       ├── notification.ts   # System notification alerts endpoints
│       ├── progress.ts       # Topic unlock & progression evaluation API
│       ├── quiz.ts           # Quiz engine, attempt grading & results API
│       ├── tutor.ts          # Google Gemini AI tutor integration API
│       └── upload.ts         # Cloud storage presigned upload URL API
│
└── src/                      # React Frontend Source Code
    ├── App.css               # App-level styling rules
    ├── App.tsx               # Primary React entry component with routing & layout wrappers
    ├── index.css             # Tailwind base rules & CSS variables
    ├── main.tsx              # React DOM mounting script
    ├── vite-env.d.ts         # Vite TypeScript environment types
    ├── assets/               # Branding graphics & SVGs
    ├── components/           # Modular React Views & Components
    │   ├── AdminPortal.tsx           # Admin dashboard for user, board, class management
    │   ├── AITutor.tsx               # Interactive Gemini AI homework tutor chat UI
    │   ├── AssignmentPage.tsx        # Student assignment viewer & submission uploader
    │   ├── CourseLearningPage.tsx    # Course viewer, video player, notes & progress bar
    │   ├── DemoPanel.tsx             # Quick multi-role account switcher
    │   ├── ForgotPasswordPage.tsx    # Password reset view
    │   ├── GetCredentialsPage.tsx    # Demo credentials reference view
    │   ├── Header.tsx                # Dynamic navigation header bar
    │   ├── LandingPage.tsx           # Hero section and features marketing page
    │   ├── LoginPage.tsx             # Universal login page with role auto-detection
    │   ├── NotesResourcesPage.tsx    # Course notes & downloadable resources tab
    │   ├── ParentPortal.tsx          # Parent analytics & performance monitor
    │   ├── PlanetLogo.tsx            # Animated logo component
    │   ├── QuizInterface.tsx         # Interactive quiz taker with timer and scoring
    │   ├── ResetPasswordPage.tsx     # Password reset page
    │   ├── Sidebar.tsx               # Dynamic navigation sidebar per user role
    │   ├── SignupPage.tsx            # Multi-role account registration modal
    │   ├── StudentDashboard.tsx      # Student dashboard with streaks & subjects
    │   ├── StudentGradesPage.tsx     # Scorecards & progress summary
    │   ├── StudentProfile.tsx        # Personal profile and account editor
    │   ├── SubmissionsPage.tsx       # Teacher assignment grading desk
    │   ├── TeacherDashboard.tsx      # Teacher management portal
    │   └── LiveClass/
    │       ├── CollaborativeWhiteboard.tsx # Real-time whiteboard canvas
    │       ├── MeetingChat.tsx             # Live meeting text chat component
    │       ├── RoomContainer.tsx           # LiveKit video stream container
    │       ├── SimulatedLiveMeeting.tsx    # Interactive live meeting player
    │       └── ZoomMeetingLayout.tsx       # Video stream grid view layout
    ├── data/
    │   └── question-bank.json        # Assessment dataset reference
    ├── services/
    │   └── api.ts                    # Centralized API client library (Fetch API + JWT)
    ├── store/
    │   ├── curriculumData.ts         # Static curriculum fallback data
    │   ├── index.ts                  # Zustand global application state store
    │   └── types.ts                  # Core TypeScript interface definitions
    └── utils/
        ├── apiBase.ts                # API URL resolution helper
        ├── localStorage.ts           # Web storage helper utilities
        └── quizGenerator.ts          # Quiz generator logic helper
```

---

## 🗄️ Database Schema Summary (Prisma ORM)

The relational database architecture is defined in [`prisma/schema.prisma`](prisma/schema.prisma) with over 20 structured models:

- **User Management**: `User`, `Role`, `Permission`, `RolePermission`, `UserRoleJoin`, `Admin`, `Teacher`, `Student`.
- **Academic Hierarchy**: `Board`, `Class`, `Subject`, `Unit`, `Chapter`, `Topic`.
- **Content & Media**: `Course`, `CourseVideo`, `CourseNote`, `CourseResource`.
- **Progression Logic**: `StudentTopicProgress`, `StudentChapterProgress`, `StudentSubjectProgress`, `VideoWatchHistory`.
- **Assessment Engine**: `Quiz`, `QuizQuestion`, `QuizOption`, `QuizAttempt`, `QuizQuestionResponse`, `QuizResult`.
- **Assignment System**: `Assignment`, `AssignmentSubmission`, `AssignmentFeedback`.
- **Live Video Classrooms**: `LiveClass`, `LiveClassParticipant`, `LiveChatMessage`.
- **Gamification & Analytics**: `StudentAnalytics`, `PerformanceReport`, `LearningStreak`.
- **Subscriptions & Billing**: `SubscriptionPlan`, `Subscription`, `Payment`.

---

## ⚡ Quickstart & Setup Guide

### 1. System Requirements
- **Node.js**: `v18.x` or `v20.x`
- **npm**: `v9.x` or higher
- **PostgreSQL Database**

### 2. Installation
```bash
git clone https://github.com/leelakrishnakurra97/learning-management-system.git
cd learning-management-system
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
VITE_API_URL=http://localhost:5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/learning_management_system?schema=public"
JWT_SECRET="super-secret-jwt-key"
GEMINI_API_KEY="your-google-gemini-api-key"
```

### 4. Database Setup & Seeding
```bash
# Push schema migrations to PostgreSQL
npm run db:push

# Seed default academic hierarchy, subjects, and demo accounts
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend Express API**: `http://localhost:5000`

---

## 🐳 Docker Deployment

Spin up the local PostgreSQL database, MinIO S3 object storage, and LiveKit WebRTC server:

```bash
docker-compose up -d
```

---

## 🔑 Demo Access Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@eduverse.com` | `admin123` |
| **Teacher** | `teacher@eduverse.com` | `teacher123` |
| **Student** | `student@eduverse.com` | `student123` |
| **Parent** | `parent@eduverse.com` | `parent123` |

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
