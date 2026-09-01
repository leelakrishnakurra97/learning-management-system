# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+ (or Docker)
- Git

### Step 1: Install Dependencies
```bash
cd Final
npm install
```

### Step 2: Set Up Environment
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Edit `.env` and update:
```
DATABASE_URL="postgresql://user:password@localhost:5432/lms_db"
VITE_API_URL="http://localhost:3000"
```

### Step 3: Set Up Database
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npx prisma db seed

# Generate Prisma client
npx prisma generate
```

### Step 4: Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 5: Access the Application
- **Student**: Login with student credentials
- **Teacher**: Login with teacher credentials  
- **Admin**: Login with admin credentials

## 📚 Project Structure

```
src/
├── components/          # React components (12 essential)
├── services/           # API service layer
├── store/              # State management (Zustand)
│   ├── types.ts       # Database-aligned types
│   └── index.ts       # Store implementation
├── utils/              # Helper functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles

prisma/
├── schema.prisma       # Database schema (20+ models)
└── seed.ts            # Sample data

```

## 🎯 Main Features

### For Students
- **Landing Page**: Home and introduction
- **Dashboard**: Overview of courses and progress
- **Deep Lectures**: Watch course videos with tracking
- **Quiz Center**: Take quizzes and see results
- **Assignments**: Submit and track assignments
- **Profile**: Manage account and view progress

### For Teachers
- **Dashboard**: Manage courses and students
- **Content**: Upload videos, notes, and resources
- **Assessments**: Create quizzes and assignments
- **Grading**: Review and grade submissions
- **Analytics**: View student performance

### For Admins
- **Portal**: System administration
- **Structure**: Manage boards, classes, subjects
- **Analytics**: Platform-wide analytics

## 🔌 API Integration

All API calls are organized in `src/services/api.ts`:

```typescript
// Example: Fetch boards
import { academicAPI } from './services/api';
const boards = await academicAPI.getBoards();

// Example: Submit quiz
import { quizAPI } from './services/api';
const result = await quizAPI.submitQuizAttempt(quizId, responses);
```

## 🗄️ Database

### View Database
```bash
# Open Prisma Studio
npx prisma studio
```

### Create Migrations
```bash
# After schema changes
npx prisma migrate dev --name <migration_name>
```

## 🧪 Development Commands

```bash
# Dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Open Prisma Studio
npx prisma studio

# Reset database (caution!)
npx prisma migrate reset
```

## 📝 Database Schema Highlights

**Key Models:**
- `User` - Core user account
- `Board`, `Class`, `Subject`, `Unit`, `Chapter`, `Topic` - Academic hierarchy
- `CourseVideo`, `CourseNote`, `CourseResource` - Learning materials
- `Quiz`, `QuizQuestion`, `QuizOption` - Assessments
- `Assignment`, `AssignmentSubmission` - Assignments
- `StudentTopicProgress`, `StudentAnalytics` - Progress tracking
- `LiveClass`, `LiveClassParticipant` - Live sessions
- `Subscription`, `Payment` - Billing

## 🔐 Authentication

The app uses JWT tokens stored in localStorage:
```typescript
// Token is automatically added to API headers
const token = localStorage.getItem('auth_token');
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

### Database Connection Failed
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Verify credentials

### Prisma Errors
```bash
# Reinstall Prisma
npm install -D prisma @prisma/client

# Regenerate client
npx prisma generate
```

## 📖 Documentation

- **REFACTORING.md** - Detailed refactoring guide
- **CLEANUP.md** - Implementation checklist
- **SUMMARY.md** - Complete summary report
- **prisma/schema.prisma** - Database schema documentation

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/your-feature`
4. Create Pull Request

## 📞 Support

For questions:
1. Check existing documentation
2. Review API types in `src/store/types.ts`
3. Examine API implementations in `src/services/api.ts`
4. Check database schema in `prisma/schema.prisma`

---

**Happy coding! 🎉**
