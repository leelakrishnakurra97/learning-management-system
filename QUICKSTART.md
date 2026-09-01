# Quick Start Guide — EduVerse Learning Management System

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+ (or Docker Compose)
- Git

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/leelakrishnakurra97/learning-management-system.git
cd learning-management-system
npm install
```

### Step 2: Set Up Environment Configuration
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Edit `.env` and verify database and server port parameters:
```env
PORT=5000
VITE_API_URL="http://localhost:5000"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/learning_management_system?schema=public"
JWT_SECRET="eduverse-lms-super-secret-jwt-key"
GEMINI_API_KEY="your-google-gemini-api-key"
```

### Step 3: Set Up Relational Database
```bash
# Push Prisma schema to PostgreSQL
npm run db:push

# Seed initial curriculum hierarchy and demo user accounts
npm run db:seed

# Generate Prisma client
npx prisma generate
```

### Step 4: Start Concurrent Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Step 5: Access the Application (Demo Credentials)
- **Student**: `student@eduverse.com` / `student123`
- **Teacher**: `teacher@eduverse.com` / `teacher123`
- **Admin**: `admin@eduverse.com` / `admin123`
- **Parent**: `parent@eduverse.com` / `parent123`

## 📚 Project Structure

```text
learning-management-system/
├── prisma/
│   ├── schema.prisma         # Relational database schema (20+ models)
│   └── seed.ts               # Seeder for dynamic curriculum hierarchy
├── server/                   # Backend Express API Server
│   ├── index.ts              # Server entry point
│   ├── routes/               # API route modules (Auth, Progress, Quiz, Tutor, etc.)
│   └── middleware/           # JWT Authentication & RBAC middleware
├── src/                      # React 18 + TypeScript Frontend Application
│   ├── components/           # UI Components & Role Portals
│   ├── services/             # Centralized API service layer
│   ├── store/                # Zustand global application state management
│   └── utils/                # Utility helpers
```

## 🎯 Key Module Features

### For Students
- **Course Player**: Watch video lectures with duration tracking and auto-resume.
- **Sequential Topic Progression**: Prerequisites enforcement (video %, quiz score, assignment submission).
- **Quiz Center**: Timed quizzes with MCQs, true/false, immediate grading, and scorecards.
- **AI Tutor Assistant**: Step-by-step homework help powered by Google Gemini API.

### For Teachers
- **Course & Lesson Management**: Create courses, add chapters, attach videos and PDF notes.
- **Assessment Desk**: Build quizzes and view submission analytics.
- **Submission Grading Desk**: Grade student assignments, assign numerical marks, and provide feedback.
- **Live Classrooms**: Host live WebRTC meetings via LiveKit with chat and interactive whiteboard.

### For Admins
- **Academic Hierarchy Administration**: Manage Boards, Classes, Subjects, Units, Chapters, and Topics.
- **User & RBAC Controls**: Assign roles, configure permissions, and monitor enrollment metrics.

## 🔌 API Integration Example

All API requests are handled in `src/services/api.ts`:

```typescript
// Fetch academic boards
import { academicAPI } from './services/api';
const boards = await academicAPI.getBoards();

// Submit quiz attempt
import { quizAPI } from './services/api';
const result = await quizAPI.submitQuizAttempt(quizId, responses);
```

## 🗄️ Database Management Commands

```bash
# Open Prisma Studio GUI
npm run db:studio

# Apply schema updates to database
npm run db:push

# Seed initial database records
npm run db:seed
```

---

**Happy coding! 🎉**
