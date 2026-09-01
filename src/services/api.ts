// ========================================
// API SERVICE LAYER
// ========================================
// This file handles all API calls to the backend

import { getApiBaseUrl } from "../utils/apiBase";

const API_BASE_URL = `${getApiBaseUrl()}/api`;

// ========================================
// AUTH ENDPOINTS
// ========================================

export const authAPI = {
  checkEmail: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error("Failed to check email");
    return res.json() as Promise<{ exists: boolean }>;
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  signup: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    boardId: string,
    classId: string,
  ) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        role,
        boardId,
        classId,
      }),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

  logout: async () => {
    const token = localStorage.getItem("auth_token");
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getUsers: async () => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  createUser: async (userData: any) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  updateUser: async (id: string, userData: any) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  deleteUser: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
  },

  subscribe: async (email: string, subscriptionPlan: string = "Full Academic Access Pass") => {
    const res = await fetch(`${API_BASE_URL}/auth/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subscriptionPlan }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Subscription failed");
    }
    return res.json();
  },
  forgotPassword: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to send OTP');
    }
    return res.json();
  },
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to reset password');
    }
    return res.json();
  },
};

// ========================================
// ACADEMIC STRUCTURE ENDPOINTS
// ========================================

export const academicAPI = {
  getFullStructure: async () => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/academic/structure`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to fetch academic structure");
    return res.json();
  },

  getBoards: async () => {
    const res = await fetch(`${API_BASE_URL}/boards`);
    if (!res.ok) throw new Error("Failed to fetch boards");
    return res.json();
  },

  getClasses: async (boardId: string) => {
    const res = await fetch(`${API_BASE_URL}/boards/${boardId}/classes`);
    if (!res.ok) throw new Error("Failed to fetch classes");
    return res.json();
  },

  getSubjects: async (classId: string) => {
    const res = await fetch(`${API_BASE_URL}/classes/${classId}/subjects`);
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
  },

  getChapters: async (subjectId: string) => {
    const res = await fetch(`${API_BASE_URL}/subjects/${subjectId}/units`);
    if (!res.ok) throw new Error("Failed to fetch units");
    return res.json();
  },

  getTopics: async (chapterId: string) => {
    const res = await fetch(`${API_BASE_URL}/chapters/${chapterId}/topics`);
    if (!res.ok) throw new Error("Failed to fetch topics");
    return res.json();
  },
};

// ========================================
// COURSE CONTENT ENDPOINTS
// ========================================

export const courseAPI = {
  getVideos: async (topicId: string) => {
    const res = await fetch(`${API_BASE_URL}/topics/${topicId}/videos`);
    if (!res.ok) throw new Error("Failed to fetch videos");
    return res.json();
  },

  getNotes: async (topicId: string) => {
    const res = await fetch(`${API_BASE_URL}/topics/${topicId}/notes`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
  },

  getResources: async (topicId: string) => {
    const res = await fetch(`${API_BASE_URL}/topics/${topicId}/resources`);
    if (!res.ok) throw new Error("Failed to fetch resources");
    return res.json();
  },

  trackVideoProgress: async (
    videoId: string,
    watchDuration: number,
    completedPercent: number,
  ) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/videos/${videoId}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ watchDuration, completedPercent }),
    });
    if (!res.ok) throw new Error("Failed to track progress");
    return res.json();
  },
};

// ========================================
// QUIZ ENDPOINTS
// ========================================

export const quizAPI = {
  getQuiz: async (quizId: string) => {
    const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);
    if (!res.ok) throw new Error("Failed to fetch quiz");
    return res.json();
  },

  getQuizzesByTopic: async (topicId: string) => {
    const res = await fetch(`${API_BASE_URL}/topics/${topicId}/quizzes`);
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
  },

  submitQuizAttempt: async (
    quizId: string,
    responses: Array<{ questionId: string; selectedOptionId?: string }>,
  ) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/quizzes/${quizId}/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ responses }),
    });
    if (!res.ok) throw new Error("Failed to submit quiz");
    return res.json();
  },

  getQuizResults: async (studentId: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${API_BASE_URL}/students/${studentId}/quiz-results`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch results");
    return res.json();
  },
};

// ========================================
// ASSIGNMENT ENDPOINTS
// ========================================

export const assignmentAPI = {
  getAssignmentsByTopic: async (topicId: string) => {
    const res = await fetch(`${API_BASE_URL}/topics/${topicId}/assignments`);
    if (!res.ok) throw new Error("Failed to fetch assignments");
    return res.json();
  },

  submitAssignment: async (assignmentId: string, submissionUrl: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${API_BASE_URL}/assignments/${assignmentId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ submissionUrl }),
      },
    );
    if (!res.ok) throw new Error("Failed to submit assignment");
    return res.json();
  },

  getSubmissions: async (studentId: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${API_BASE_URL}/students/${studentId}/submissions`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch submissions");
    return res.json();
  },
};

// ========================================
// STUDENT PROGRESS ENDPOINTS
// ========================================

export const progressAPI = {
  getTopicProgress: async (studentId: string, topicId: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${API_BASE_URL}/students/${studentId}/progress/topics/${topicId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) throw new Error("Failed to fetch progress");
    return res.json();
  },

  getSubjectProgress: async (studentId: string, subjectId: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${API_BASE_URL}/students/${studentId}/progress/subjects/${subjectId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) throw new Error("Failed to fetch subject progress");
    return res.json();
  },

  getAnalytics: async (studentId: string) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/students/${studentId}/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return res.json();
  },
};

// ========================================
// AI TUTOR ENDPOINTS
// ========================================

export const tutorAPI = {
  askQuestion: async (
    question: string,
    history: Array<{ role: "user" | "model"; text: string; attachment?: any }>,
    attachment?: { name: string; type: string; data: string } | null,
  ) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE_URL}/tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, history, attachment }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("auth_token");
        window.location.reload();
        throw new Error("Session expired. Logging out...");
      }
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to contact AI Tutor");
    }
    return res.json();
  },
};
