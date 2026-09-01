import React, { useState, useEffect, useRef } from "react";
import { useLmsStore } from "../store/index";
import { authAPI, academicAPI } from "../services/api";
import {
  Zap,
  ChevronDown,
  ChevronUp,
  User,
  GraduationCap,
  Shield,
  Video,
  Award,
  Flame,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";

export const DemoPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setView, addNotification, isDarkMode, toggleDarkMode, boards, profile } = useLmsStore();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  // Dragging states
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't drag if clicking interactive elements inside, except the header or toggle button itself
    if (target.closest("button") && target.closest("button") !== e.currentTarget) {
      return;
    }
    if (target.closest("select") || target.closest("option") || target.closest("input") || target.closest("textarea")) {
      return;
    }
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = { x: position.x, y: position.y };
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") && target.closest("button") !== e.currentTarget) {
      return;
    }
    if (target.closest("select") || target.closest("option") || target.closest("input") || target.closest("textarea")) {
      return;
    }
    const touch = e.touches[0];
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    dragOffset.current = { x: position.x, y: position.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }
      setPosition({
        x: dragOffset.current.x + dx,
        y: dragOffset.current.y + dy,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }
      setPosition({
        x: dragOffset.current.x + dx,
        y: dragOffset.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const handleSimulateRole = async (role: "student" | "teacher" | "admin") => {
    setLoadingRole(role);
    try {
      let email = "";
      let password = "password123";

      if (role === "student") {
        // We prioritize the active user account if it exists, otherwise fall back to seeded student
        email = "leelakrishna.kurra7@gmail.com";
        password = "Nexora@5574";
      } else if (role === "teacher") {
        email = "teacher@nexoralearning.com";
      } else {
        email = "admin@nexoralearning.com";
      }

      let result;
      try {
        result = await authAPI.login(email, password);
      } catch (err) {
        // Fall back to seeded student if active user login fails for some reason
        if (role === "student" && email !== "student@nexoralearning.com") {
          email = "student@nexoralearning.com";
          password = "password123";
          result = await authAPI.login(email, password);
        } else {
          throw err;
        }
      }

      localStorage.setItem("auth_token", result.token);

      let latestBoards = boards;
      try {
        latestBoards = await academicAPI.getFullStructure();
      } catch {
        // Keep existing boards
      }

      const profile = {
        ...result.user,
        role: result.role as "student" | "teacher" | "admin",
        subjectArea: result.role === "teacher" ? "Mathematics" : undefined,
      };

      if (profile.role === "student" && !profile.optedSubjectId) {
        const activeBoard =
          latestBoards.find((b) => b.id === profile.selectedBoardId) || latestBoards[0];
        const activeClass =
          activeBoard?.classes.find((c) => c.id === profile.selectedClassId) ||
          activeBoard?.classes[0];
        profile.optedSubjectId = activeClass?.subjects[0]?.id ?? "";
      }

      useLmsStore.setState({
        boards: latestBoards,
        profile,
        auth: {
          isAuthenticated: true,
          user: null,
          token: result.token,
          loading: false,
          error: null,
        },
      });

      addNotification(
        "Simulation Active",
        `Switched user session to simulated ${role.toUpperCase()} role successfully.`,
        "success"
      );

      if (role === "student") {
        setView("student-dash");
      } else if (role === "teacher") {
        setView("teacher-dash");
      } else {
        setView("admin-analytics");
      }
    } catch (err: any) {
      console.error(err);
      addNotification("Simulation Error", `Could not simulate ${role} login. Make sure servers are running.`, "alert");
    } finally {
      setLoadingRole(null);
    }
  };

  const simulateEvent = (event: "live" | "quiz" | "streak") => {
    if (event === "live") {
      addNotification(
        "📺 Live Class Alert",
        "Dr. Ramesh Prasad has started a live session on Physics: Coulomb's Law. Room Code: physics-101.",
        "info"
      );
    } else if (event === "quiz") {
      addNotification(
        "💯 Quiz Graded",
        "Your recent attempt on 'Matrices Basics Assessment' was graded: 90% (Passed). XP +100 earned!",
        "success"
      );
    } else if (event === "streak") {
      addNotification(
        "🔥 Streak Warning",
        "Your 9-day study streak will expire in 2 hours. Complete a topic now to keep it active!",
        "alert"
      );
    }
  };

  return (
    <div 
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="fixed bottom-6 right-6 z-[9999] font-sans text-left"
    >
      {/* Overlay Panel */}
      {isOpen && (
        <div className="bg-[#0b0f19] border border-slate-800/80 shadow-2xl p-5 w-72 mb-3 rounded-2xl animate-fade-in-up backdrop-blur-md text-slate-200">
          {/* Header */}
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4 cursor-move select-none"
          >
            <div className="flex items-center gap-1.5 text-brand-violet font-bold text-xs uppercase tracking-wider font-mono">
              <span>{`>_`}</span>
              <span>Eduverse Demo Panel</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-1.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-850 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Simulate User Role */}
          <div className="space-y-2 mb-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Simulate User Role
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                disabled={loadingRole !== null}
                onClick={() => handleSimulateRole("student")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300 disabled:opacity-50"
              >
                <User className="w-4 h-4 mb-1 text-blue-500" />
                <span>Student</span>
              </button>
              <button
                disabled={loadingRole !== null}
                onClick={() => handleSimulateRole("teacher")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300 disabled:opacity-50"
              >
                <GraduationCap className="w-4 h-4 mb-1 text-emerald-500" />
                <span>Teacher</span>
              </button>
              <button
                disabled={loadingRole !== null}
                onClick={() => handleSimulateRole("admin")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300 disabled:opacity-50"
              >
                <Shield className="w-4 h-4 mb-1 text-rose-500" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Simulate Academic Class */}
          <div className="space-y-2 mb-4 border-t border-slate-800/40 pt-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Simulate Academic Class
            </label>
            <select
              value={profile?.selectedClassId || ""}
              onChange={(e) => {
                const classId = e.target.value;
                if (!classId || !profile) return;
                
                const currentBoards = useLmsStore.getState().boards;
                const activeBoard = currentBoards.find(b => b.id === profile.selectedBoardId) || currentBoards[0];
                const activeClass = activeBoard?.classes.find(c => c.id === classId);
                const defaultSubjectId = activeClass?.subjects[0]?.id || "";

                const updatedProfile = {
                  ...profile,
                  selectedClassId: classId,
                  optedSubjectId: defaultSubjectId
                };

                useLmsStore.setState({
                  profile: updatedProfile,
                  activeSubjectId: defaultSubjectId
                });

                addNotification(
                  "Class Context Updated",
                  `Switched workspace view to ${activeClass?.title || 'selected class'}.`,
                  "success"
                );
              }}
              className="w-full bg-[#161b26] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-violet transition-colors"
            >
              <option value="" disabled>Select Class Level</option>
              {boards.flatMap(b => b.classes).map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.title}
                </option>
              ))}
            </select>
          </div>

          {/* Simulate Real-Time Events */}
          <div className="space-y-2 mb-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Simulate Real-Time Events
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => simulateEvent("live")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300"
              >
                <Video className="w-4 h-4 mb-1 text-blue-400" />
                <span>Live Class</span>
              </button>
              <button
                onClick={() => simulateEvent("quiz")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300"
              >
                <Award className="w-4 h-4 mb-1 text-emerald-400" />
                <span>Quiz Grade</span>
              </button>
              <button
                onClick={() => simulateEvent("streak")}
                className="flex flex-col items-center justify-center p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all text-xs font-semibold text-slate-300"
              >
                <Flame className="w-4 h-4 mb-1 text-amber-500" />
                <span>Streak Alert</span>
              </button>
            </div>
          </div>

          {/* Jump Directly to Screen */}
          <div className="space-y-2 border-t border-slate-800/40 pt-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Jump Directly To Screen
            </label>
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Public Pages
              </div>
              <button
                onClick={() => {
                  setView("landing");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/30 hover:bg-slate-900/70 border border-slate-850 rounded-lg text-slate-300 text-xs transition-all text-left"
              >
                <span>1. Premium Landing Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => {
                  setView("login-student");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/30 hover:bg-slate-900/70 border border-slate-850 rounded-lg text-slate-300 text-xs transition-all text-left"
              >
                <span>2a. Student Login Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => {
                  setView("login-educator");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/30 hover:bg-slate-900/70 border border-slate-850 rounded-lg text-slate-300 text-xs transition-all text-left"
              >
                <span>2b. Educator Login Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>              <button
                onClick={() => {
                  setView("signup");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/30 hover:bg-slate-900/70 border border-slate-850 rounded-lg text-slate-300 text-xs transition-all text-left"
              >
                <span>3. Signup Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>

              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mt-2.5 mb-1">
                Academic Pages
              </div>
              <button
                onClick={() => {
                  setView("webrtc-live");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/30 hover:bg-slate-900/70 border border-slate-850 rounded-lg text-slate-300 text-xs transition-all text-left"
              >
                <span>4. Live Class Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={(e) => {
          if (hasMoved.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider cursor-move select-none"
      >
        <Zap className="w-4 h-4 fill-white" />
        <span>Demo Controls</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>
    </div>
  );
};
