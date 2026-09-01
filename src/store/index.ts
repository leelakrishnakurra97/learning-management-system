import { create } from "zustand";
import { getApiBaseUrl } from "../utils/apiBase";
import type {
  LMSStore,
  Board,
  ClassLevel,
  Subject,
  Topic,
  AuthState,
  Profile,
  Notification,
  Assignment,
  Quiz,
  QuizResult,
  Bookmark,
} from "./types";

const makeId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now()}`;

const defaultProfile: Profile = {
  id: "",
  name: "Guest",
  username: "guest",
  password: "",
  email: "",
  role: "student",
  selectedBoardId: "",
  selectedClassId: "",
  optedSubjectId: "",
  age: "",
  location: "",
  xp: 0,
  level: 1,
  coins: 0,
  streak: 0,
  achievements: [],
  certificates: [],
};

const defaultBoards: Board[] = [
  {
    id: "tnsb",
    title: "TN State Board",
    code: "TNSB",
    classes: [
      {
        id: "class-12",
        title: "Class 12",
        subjects: [
          {
            id: "maths-12-v1",
            title: "Mathematics",
            color: "#4f46e5",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "physics-12-v1",
            title: "Physics",
            color: "#8b5cf6",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "chemistry-12-v1",
            title: "Chemistry",
            color: "#ec4899",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
        ],
      },
      {
        id: "class-11",
        title: "Class 11",
        subjects: [
          {
            id: "maths-11-v1",
            title: "Mathematics",
            color: "#4f46e5",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "physics-11-v1",
            title: "Physics",
            color: "#8b5cf6",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "chemistry-11-v1",
            title: "Chemistry",
            color: "#ec4899",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
        ],
      },
      {
        id: "class-10",
        title: "Class 10",
        subjects: [
          {
            id: "maths-10",
            title: "Mathematics",
            color: "#4f46e5",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "science-10",
            title: "Science",
            color: "#10b981",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
        ],
      },
      {
        id: "class-9",
        title: "Class 9",
        subjects: [
          {
            id: "maths-9",
            title: "Mathematics",
            color: "#4f46e5",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
          {
            id: "science-9",
            title: "Science",
            color: "#10b981",
            imageUrl: undefined,
            chapters: [
              {
                id: "chap-1",
                title: "Chapter 1",
                imageUrl: undefined,
                topics: [
                  { id: "topic-1", title: "Introduction", content: "", duration: "5m" }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
const defaultAssignments: Assignment[] = [];
const defaultQuizzes: Quiz[] = [];
const defaultNotifications: Notification[] = [
  {
    id: makeId("notif"),
    title: "Welcome!",
    message: "Your Nexora Learning workspace is ready. Explore lessons, quizzes and assignments.",
    type: "info",
    read: false,
    time: new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

const getStoredProfile = (): Profile => {
  const stored = localStorage.getItem("lms_user_profile");
  if (stored) {
    try {
      return JSON.parse(stored) as Profile;
    } catch {
      return defaultProfile;
    }
  }
  return defaultProfile;
};

const getStoredActiveView = (): string => {
  return "landing";
};

export const useLmsStore = create<LMSStore>((set, get) => ({
  auth: {
    isAuthenticated: !!localStorage.getItem("auth_token") && !!localStorage.getItem("lms_user_profile"),
    user: getStoredProfile().id ? getStoredProfile() : null,
    token: localStorage.getItem("auth_token") || null,
    loading: false,
    error: null,
  },

  setAuth: (authUpdate: Partial<AuthState>) =>
    set((state) => ({ auth: { ...state.auth, ...authUpdate } })),

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("lms_user_profile");
    set({
      auth: {
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      },
      profile: defaultProfile,
      activeView: "landing",
    });
  },

  activeView: "landing",
  setView: (view: string) => set({ activeView: view }),

  isDarkMode: localStorage.getItem("darkMode") === "true",
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", String(newDarkMode));
      return { isDarkMode: newDarkMode };
    }),
  setTheme: (value: boolean) => {
    localStorage.setItem("darkMode", String(value));
    set({ isDarkMode: value });
  },

  selectedBoard: null,
  selectedClass: null,
  selectedSubject: null,
  setSelectedBoard: (board: Board) => set({ selectedBoard: board }),
  setSelectedClass: (classLevel: ClassLevel) =>
    set({ selectedClass: classLevel }),
  setSelectedSubject: (subject: Subject) => set({ selectedSubject: subject }),

  currentTopic: null,
  setCurrentTopic: (topic: Topic) => set({ currentTopic: topic }),

  profile: getStoredProfile(),
  boards: defaultBoards,
  assignments: defaultAssignments,
  quizzes: defaultQuizzes,
  activeQuizId: null,
  quizResults: [],
  notifications: defaultNotifications,
  bookmarks: [],
  liveRoomState: null,
  activeSubjectId: getStoredProfile() ? getStoredProfile().optedSubjectId : "",
  activeChapterId: "",
  activeTopicId: "",

  submitAssignment: async (assignmentId, file) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${getApiBaseUrl()}/api/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        await get().fetchAssignments();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit assignment");
      }
    } catch (err: any) {
      console.warn("Failed to submit assignment:", err);
      throw err;
    }
  },

  gradeAssignment: async (assignmentId, grade, feedback) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      let submissionId = assignmentId;
      if (assignmentId.includes("_")) {
        submissionId = assignmentId.split("_")[1];
      }
      const match = grade.match(/(\d+)\/100/);
      const marksObtained = match ? match[1] : "100";
      const res = await fetch(`${getApiBaseUrl()}/api/assignments/submissions/${submissionId}/grade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ marksObtained, comment: feedback })
      });
      if (res.ok) {
        await get().fetchAssignments();
      }
    } catch (err) {
      console.warn("Failed to grade assignment:", err);
    }
  },

  fetchAssignments: async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/assignments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ assignments: data.assignments || [] });
      }
    } catch (err) {
      console.warn("Failed to fetch assignments:", err);
    }
  },

  setActiveQuiz: (quizId) => set({ activeQuizId: quizId }),

  submitQuizResult: (result) =>
    set((state) => ({ quizResults: [...state.quizResults, result] })),

  addNotification: (title, message, type) =>
    set((state) => ({
      notifications: [
        {
          id: makeId("notif"),
          title,
          message,
          type,
          read: false,
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...state.notifications,
      ],
    })),

  readAllNotifications: async () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    }));
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      await fetch(`${getApiBaseUrl()}/api/notifications/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn("Failed to sync read status with server:", err);
    }
  },

  fetchNotifications: async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ notifications: data.notifications || [] });
      }
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    }
  },

  addBookmark: (bookmark, timestamp) =>
    set((state) => ({
      bookmarks: [
        {
          id: makeId("bookmark"),
          timestamp,
          ...bookmark,
        },
        ...state.bookmarks,
      ],
    })),

  deleteBookmark: (bookmarkId) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId,
      ),
    })),

  setActiveCourseContext: (subjectId, chapterId, topicId) =>
    set((state) => ({
      activeSubjectId: subjectId || state.activeSubjectId,
      activeChapterId: chapterId || state.activeChapterId,
      activeTopicId: topicId || state.activeTopicId,
    })),

  completeTopic: (boardId, classId, subjectId, chapterId, topicId) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              classes: board.classes.map((classLevel) =>
                classLevel.id !== classId
                  ? classLevel
                  : {
                      ...classLevel,
                      subjects: classLevel.subjects.map((subject) =>
                        subject.id !== subjectId
                          ? subject
                          : {
                              ...subject,
                              chapters: subject.chapters.map((chapter) =>
                                chapter.id !== chapterId
                                  ? chapter
                                  : {
                                      ...chapter,
                                      topics: chapter.topics.map((topic) =>
                                        topic.id !== topicId
                                          ? topic
                                          : { ...topic, isCompleted: true },
                                      ),
                                    },
                              ),
                            },
                      ),
                    },
              ),
            },
      ),
      profile: {
        ...state.profile,
        xp: state.profile.xp + 50,
        coins: state.profile.coins + 10,
        streak: state.profile.streak + 1,
      },
    })),

  joinLiveRoom: (state) => set({ liveRoomState: state }),

  addBoard: (title) =>
    set((state) => ({
      boards: [
        ...state.boards,
        {
          id: makeId("board"),
          title,
          classes: [],
        },
      ],
    })),

  addClass: (boardId, classTitle) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              classes: [
                ...board.classes,
                {
                  id: makeId("class"),
                  title: classTitle,
                  subjects: [],
                },
              ],
            },
      ),
    })),

  addSubject: (boardId, classId, subjectTitle, subjectColor) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              classes: board.classes.map((classLevel) =>
                classLevel.id !== classId
                  ? classLevel
                  : {
                      ...classLevel,
                      subjects: [
                        ...classLevel.subjects,
                        {
                          id: makeId("subject"),
                          title: subjectTitle,
                          color: subjectColor,
                          imageUrl: undefined,
                          chapters: [],
                        },
                      ],
                    },
              ),
            },
      ),
    })),
}));

useLmsStore.subscribe((state) => {
  if (state.profile && state.profile.id !== "student-001") {
    localStorage.setItem("lms_user_profile", JSON.stringify(state.profile));
  }
});

export type { LMSStore } from "./types";
