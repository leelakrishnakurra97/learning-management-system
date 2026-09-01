// ========================================
// DATABASE-ALIGNED TYPES
// ========================================

export type UserRole = "student" | "teacher" | "admin";
export type NotificationType = "success" | "info" | "alert";
export type AssignmentStatus = "Pending" | "Submitted" | "Graded";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  grade: string;
  issuer: string;
  date: string;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  selectedBoardId: string;
  selectedClassId: string;
  optedSubjectId: string;
  age?: string;
  location?: string;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  achievements: Achievement[];
  certificates: Certificate[];
  subjectArea?: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  duration: string;
  pdfUrl?: string;
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  imageUrl?: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  color: string;
  imageUrl?: string;
  chapters: Chapter[];
}

export interface ClassLevel {
  id: string;
  title: string;
  subjects: Subject[];
}

export interface Board {
  id: string;
  title: string;
  code?: string;
  classes: ClassLevel[];
}

export interface Bookmark {
  id: string;
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  subjectTitle: string;
  note: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  time: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  chapterId: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResultDetail {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  recommendedTopicId: string;
}

export interface QuizResult {
  quizId: string;
  title: string;
  score: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  date: string;
  incorrectAnswersDetails: QuizResultDetail[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectTitle: string;
  deadline: string;
  rawDeadline?: string;
  className?: string;
  submittedAt?: string;
  points: number;
  status: AssignmentStatus;
  submissionFile?: string;
  grade?: string;
  feedback?: string;
  studentName?: string;
  teacherName?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Profile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LMSStore {
  auth: AuthState;
  setAuth: (auth: Partial<AuthState>) => void;
  logout: () => void;

  activeView: string;
  setView: (view: string) => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setTheme: (isDarkMode: boolean) => void;

  selectedBoard: Board | null;
  selectedClass: ClassLevel | null;
  selectedSubject: Subject | null;
  setSelectedBoard: (board: Board) => void;
  setSelectedClass: (classLevel: ClassLevel) => void;
  setSelectedSubject: (subject: Subject) => void;

  currentTopic: Topic | null;
  setCurrentTopic: (topic: Topic) => void;

  profile: Profile;
  boards: Board[];
  assignments: Assignment[];
  submitAssignment: (assignmentId: string, file: File) => Promise<void>;
  gradeAssignment: (
    assignmentId: string,
    grade: string,
    feedback: string,
  ) => Promise<void>;
  fetchAssignments: () => Promise<void>;

  quizzes: Quiz[];
  activeQuizId: string | null;
  quizResults: QuizResult[];
  setActiveQuiz: (quizId: string | null) => void;
  submitQuizResult: (result: QuizResult) => void;

  notifications: Notification[];
  addNotification: (
    title: string,
    message: string,
    type: NotificationType,
  ) => void;
  readAllNotifications: () => Promise<void>;
  fetchNotifications: () => Promise<void>;

  bookmarks: Bookmark[];
  addBookmark: (
    bookmark: Omit<Bookmark, "id" | "timestamp">,
    timestamp: string,
  ) => void;
  deleteBookmark: (bookmarkId: string) => void;

  activeSubjectId: string;
  activeChapterId: string;
  activeTopicId: string;
  setActiveCourseContext: (
    subjectId: string | null,
    chapterId: string | null,
    topicId: string | null,
  ) => void;

  completeTopic: (
    boardId: string,
    classId: string,
    subjectId: string,
    chapterId: string,
    topicId: string,
  ) => void;

  liveRoomState: { roomName: string; participantName: string; isTeacher: boolean; } | null;
  joinLiveRoom: (state: { roomName: string; participantName: string; isTeacher: boolean; } | null) => void;

  addBoard: (title: string) => void;
  addClass: (boardId: string, classTitle: string) => void;
  addSubject: (
    boardId: string,
    classId: string,
    subjectTitle: string,
    subjectColor: string,
  ) => void;
}
