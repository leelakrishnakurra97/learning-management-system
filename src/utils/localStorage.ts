import type { Profile } from "../store/types";

const STORAGE_KEY = "nexoralearning_registered_students";

const defaultStudent: Profile = {
  id: "student-001",
  name: "Prathamesh Sharma",
  username: "prathamesh",
  password: "1234",
  email: "prathamesh@nexoralearning.in",
  role: "student",
  age: "17",
  location: "Chennai",
  selectedBoardId: "tnsb",
  selectedClassId: "class-12",
  optedSubjectId: "maths-12",
  xp: 2100,
  level: 7,
  coins: 84,
  streak: 9,
  achievements: [
    {
      id: "ach-1",
      title: "Fresh Scholar",
      description: "Created an Nexora Learning account",
      icon: "🌱",
      unlockedAt: new Date().toLocaleDateString("en-IN"),
    },
  ],
  certificates: [],
};

export const getRegisteredStudents = (): Profile[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const stored = JSON.parse(raw) as Profile[];
      if (Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    } catch {
      // fall through to reset storage
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultStudent]));
  return [defaultStudent];
};

export const saveRegisteredStudent = (student: Profile) => {
  const students = getRegisteredStudents();
  const filtered = students.filter(
    (existing) => existing.username !== student.username,
  );
  const updated = [student, ...filtered];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
