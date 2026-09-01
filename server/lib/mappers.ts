const SUBJECT_COLORS = [
  'from-indigo-600 to-violet-700',
  'from-emerald-600 to-teal-700',
  'from-orange-500 to-red-600',
  'from-blue-600 to-cyan-600',
  'from-purple-600 to-pink-600',
];

export function subjectColor(code: string, index: number) {
  const hash = code.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return SUBJECT_COLORS[(hash + index) % SUBJECT_COLORS.length];
}

export function mapTopic(topic: {
  id: string;
  name: string;
  studentProgress?: Array<{ isCompleted: boolean }>;
  notes?: Array<{ id: string; title: string; fileUrl: string }>;
  videos?: Array<{ id: string; title: string; videoUrl: string; duration: number }>;
}) {
  const firstNote = topic.notes?.[0];
  const firstVideo = topic.videos?.[0];

  return {
    id: topic.id,
    title: topic.name,
    content: `Study material for ${topic.name}.`,
    duration: firstVideo ? `${Math.round(firstVideo.duration / 60)} mins` : '15 mins',
    isCompleted: topic.studentProgress?.[0]?.isCompleted ?? false,
    pdfUrl: firstNote?.fileUrl || undefined,
    videoUrl: firstVideo?.videoUrl || undefined,
  };
}

export function mapChapter(chapter: {
  id: string;
  name: string;
  topics: Array<{
    id: string;
    name: string;
    studentProgress?: Array<{ isCompleted: boolean }>;
  }>;
}) {
  return {
    id: chapter.id,
    title: chapter.name,
    topics: chapter.topics.map(mapTopic),
  };
}

export function mapSubject(
  subject: {
    id: string;
    name: string;
    code: string;
    units: Array<{
      chapters: Array<{
        id: string;
        name: string;
        topics: Array<{
          id: string;
          name: string;
          studentProgress?: Array<{ isCompleted: boolean }>;
        }>;
      }>;
    }>;
  },
  index: number
) {
  const chapters = subject.units.flatMap((unit) =>
    unit.chapters.map((chapter) => ({
      ...mapChapter(chapter),
      title: (unit.name !== 'Core Syllabus') ? `${unit.name}: ${chapter.name}` : chapter.name,
    }))
  );

  return {
    id: subject.id,
    title: subject.name,
    color: subjectColor(subject.code, index),
    chapters,
  };
}

export function mapClassLevel(
  classLevel: {
    id: string;
    name: string;
    subjects: Array<{
      id: string;
      name: string;
      code: string;
      units: Array<{
        chapters: Array<{
          id: string;
          name: string;
          topics: Array<{
            id: string;
            name: string;
            studentProgress?: Array<{ isCompleted: boolean }>;
          }>;
        }>;
      }>;
    }>;
  }
) {
  return {
    id: classLevel.id,
    title: classLevel.name,
    subjects: classLevel.subjects.map((subject, index) => mapSubject(subject, index)),
  };
}

export function mapBoard(board: {
  id: string;
  name: string;
  classes: Array<Parameters<typeof mapClassLevel>[0]>;
}) {
  return {
    id: board.id,
    title: board.name,
    classes: board.classes.map(mapClassLevel),
  };
}

export function mapQuizForFrontend(quiz: {
  id: string;
  title: string;
  timeLimitMinutes: number;
  topicId: string;
  questions: Array<{
    id: string;
    questionText: string;
    options: Array<{ id: string; optionText: string; isCorrect: boolean }>;
  }>;
}) {
  const topic = quiz.topicId;
  return {
    id: quiz.id,
    title: quiz.title,
    subjectId: topic,
    chapterId: topic,
    durationMinutes: quiz.timeLimitMinutes,
    questions: quiz.questions.map((question) => {
      const correctIndex = question.options.findIndex((option) => option.isCorrect);
      return {
        id: question.id,
        question: question.questionText,
        options: question.options.map((option) => option.optionText),
        correctAnswerIndex: correctIndex >= 0 ? correctIndex : 0,
        explanation: 'Review the lesson material for a detailed explanation.',
      };
    }),
  };
}

export function mapUserProfile(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  studentProfile?: {
    boardId: string;
    classId: string;
    analytics?: { xp: number } | null;
    learningStreak?: { currentStreak: number } | null;
  } | null;
}) {
  const role = user.role.toLowerCase() as 'student' | 'teacher' | 'admin';
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    username: user.email.split('@')[0],
    password: '',
    email: user.email,
    role,
    selectedBoardId: user.studentProfile?.boardId ?? '',
    selectedClassId: user.studentProfile?.classId ?? '',
    optedSubjectId: '',
    xp: user.studentProfile?.analytics?.xp ?? 100,
    level: 1,
    coins: 10,
    streak: user.studentProfile?.learningStreak?.currentStreak ?? 1,
    achievements: [],
    certificates: [],
  };
}
