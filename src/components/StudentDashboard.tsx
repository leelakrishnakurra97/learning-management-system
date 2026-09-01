import React, { useState, useEffect } from "react";
import { useLmsStore } from "../store/index";
import { getApiBaseUrl } from "../utils/apiBase";
import {
  Sparkles,
  Play,
  Calendar,
  AlertCircle,
  ArrowRight,
  Brain,
  Clock,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export const StudentDashboard: React.FC = () => {
  const { setView, profile, boards, assignments, setActiveCourseContext, joinLiveRoom } =
    useLmsStore();

  const activeBoard =
    boards.find((b) => b.id === profile.selectedBoardId) || boards[0];
  const activeClass =
    activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) ||
    activeBoard?.classes?.[0];

  const [dbMeetings, setDbMeetings] = useState<any[]>([]);

  useEffect(() => {
    const fetchDbMeetings = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/live-classes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.meetings) {
            const filtered = data.meetings.filter(
              (m: any) => m.classLevel.toLowerCase() === activeClass?.title?.toLowerCase()
            );
            setDbMeetings(filtered);
          }
        }
      } catch (err) {
        console.warn("Failed fetching db live classes for student:", err);
      }
    };
    fetchDbMeetings();
    const interval = setInterval(fetchDbMeetings, 5000);
    return () => clearInterval(interval);
  }, [activeClass?.title]);

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  const subjects = activeClass?.subjects || [];
  const classSubjectIds = subjects.map((s) => s.id);
  const classAssignments = assignments.filter((a) =>
    classSubjectIds.includes(a.subjectId),
  );
  const pendingAssignments = classAssignments.filter(
    (a) => a.status === "Pending",
  );

  // Simple handler to launch a course
  const handleStartLearning = (subId: string) => {
    const subject = subjects.find((s) => s.id === subId);
    const firstChapter = subject?.chapters[0];
    const firstTopic = firstChapter?.topics[0];

    setActiveCourseContext(
      subId,
      firstChapter?.id || null,
      firstTopic?.id || null,
    );
    setView("course-view");
  };

  // Mock study metrics data for our visual dashboard charts
  const mockStudyHours = [
    { day: "Mon", hours: 4.2 },
    { day: "Tue", hours: 5.5 },
    { day: "Wed", hours: 3.8 },
    { day: "Thu", hours: 6.2 },
    { day: "Fri", hours: 4.8 },
    { day: "Sat", hours: 8.0 },
    { day: "Sun", hours: 2.5 },
  ];

  const maxHours = Math.max(...mockStudyHours.map((d) => d.hours));

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome & Streak Banner */}
      <div className="relative overflow-hidden glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-brand-royal/10 blur-[80px] rounded-full" />

        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, {profile.name}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Curriculum synced with{" "}
            <span className="text-slate-800 dark:text-slate-300 font-semibold">
              {activeBoard.title}
            </span>{" "}
            • {activeClass?.title || "Class 12"}
          </p>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Course Progress & Active Subjects (2 Cols on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Active Core Subjects
            </h3>
            <button
              onClick={() => setView("course-view")}
              className="text-xs text-brand-violet hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Explore Lectures</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((sub) => {
              // Calculate completion percentage based on mock topics
              const totalTopics = sub.chapters.reduce(
                (acc, chap) => acc + chap.topics.length,
                0,
              );
              const completedTopics = sub.chapters.reduce(
                (acc, chap) =>
                  acc + chap.topics.filter((t) => t.isCompleted).length,
                0,
              );
              const percent =
                totalTopics > 0
                  ? Math.round((completedTopics / totalTopics) * 100)
                  : 0;

              return (
                <div
                  key={sub.id}
                  className="glass-card p-5 border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-brand-royal/30 transition-all group relative overflow-hidden"
                >
                  {/* Subtle Background Accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-brand-royal opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity"
                  />

                  <div className="text-left w-full">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-2.5 py-1 rounded-lg bg-brand-royal text-white text-[10px] font-bold uppercase tracking-wider"
                      >
                        {sub.title}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {percent}% Completed
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-brand-violet transition-colors">
                      TN State Board Notes
                    </h4>
                    
                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-brand-royal"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed min-h-[48px]">
                      Complete TN State Board Syllabus study materials, expert revision notes, and practice assessments for {sub.title}.
                    </p>

                    <button
                      onClick={() => {
                        const firstChapter = sub.chapters[0];
                        const firstTopic = firstChapter?.topics[0];
                        setActiveCourseContext(sub.id, firstChapter?.id || null, firstTopic?.id || null);
                        setView("course-view");
                      }}
                      className="w-full py-2 bg-brand-royal hover:bg-brand-royal/90 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-brand-royal/10"
                    >
                      <span>Start Learning</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Analytics Custom Visual Chart */}
          <div className="glass-card p-6 border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between mb-6 text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Consistent Study Days
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-500">
                  Weekly track of active learning and assessment days.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-lg p-1.5 text-[10px] text-slate-600 dark:text-slate-400 font-bold select-none">
                <span>Consistent: 6/7 Days</span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="space-y-2">
              {/* Bars container with baseline border */}
              <div className="h-40 flex items-end justify-between gap-3 pt-6 border-b border-slate-200 dark:border-white/5 px-2">
                {mockStudyHours.map((data, index) => {
                  const heightPercent = (data.hours / maxHours) * 85; // cap height
                  return (
                    <div
                      key={index}
                      className="h-full flex-1 flex flex-col justify-end items-center group cursor-pointer relative"
                    >
                      {/* Tooltip */}
                      <div
                        style={{ bottom: `calc(${heightPercent}% + 8px)` }}
                        className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[9px] font-bold py-1 px-1.5 rounded shadow-lg transition-opacity pointer-events-none whitespace-nowrap z-20"
                      >
                        Active Day ({data.hours}h study)
                      </div>
                      {/* Bar */}
                      <div
                        style={{
                          height: `${heightPercent}%`,
                          borderRadius: "0px",
                        }}
                        className="w-full max-w-[24px] bg-brand-royal/70 group-hover:bg-brand-royal transition-all group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                      />
                    </div>
                  );
                })}
              </div>
              {/* Labels container below baseline */}
              <div className="flex justify-between gap-3 px-2">
                {mockStudyHours.map((data, index) => (
                  <div key={index} className="flex-1 text-center">
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {data.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Assistant, Upcoming Classes & Assignments */}
        <div className="space-y-6">
          {/* Upcoming Live Classes Card */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-left">
              Upcoming & Active Live Classes
            </h3>
            <div className="space-y-3">
              {dbMeetings.length === 0 ? (
                <div className="glass-card p-5 border-slate-200 dark:border-white/5 rounded-none">
                  <p className="text-xs text-slate-650 dark:text-slate-550 text-center py-4 rounded-none">
                    No active or scheduled live classes for {activeClass?.title || "your class"}. Wait for your teacher to go live.
                  </p>
                </div>
              ) : (
                dbMeetings.map((cls) => (
                  <div key={cls.id} className="glass-card p-5 border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-brand-royal/30 transition-all text-left bg-white dark:bg-slate-950/80 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        {cls.status === "Live" ? (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-none font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse" /> Live Now
                          </span>
                        ) : (
                          <span className="text-[10px] bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2 py-0.5 rounded-none font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                            Upcoming
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 dark:text-slate-500 font-bold tracking-wider">
                          CODE: <span className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded-none">{cls.roomName}</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                        {cls.title}
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-400">
                        Subject: <span className="font-semibold text-slate-800 dark:text-slate-300">{cls.subjectTitle}</span>
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-400 mt-0.5">
                        Teacher: <span className="font-semibold text-slate-800 dark:text-slate-300">{cls.teacherName}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-2 font-mono">
                        Scheduled: {cls.date} • {cls.startTime} - {cls.endTime}
                      </p>
                      {cls.description && (
                        <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 italic border-l-2 border-slate-200 dark:border-slate-800 pl-2">
                          "{cls.description}"
                        </p>
                      )}
                    </div>

                    {cls.status === "Live" ? (
                      <button
                        onClick={() => {
                          joinLiveRoom({
                            roomName: cls.roomName,
                            participantName: profile.name,
                            isTeacher: false
                          });
                          setView("webrtc-live");
                        }}
                        className="mt-4 w-full py-2 bg-brand-royal hover:bg-brand-royal/90 text-white rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Join Live Meeting</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed border border-slate-200 dark:border-white/5"
                      >
                        <span>Starts soon</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Assignments Tracker Card */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Deadlines
              </h3>
              {pendingAssignments.length > 0 && (
                <span className="text-[9px] bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold px-2 py-0.5 rounded-full">
                  {pendingAssignments.length} Pending
                </span>
              )}
            </div>

            <div className="glass-card p-5 border-slate-200 dark:border-white/5">
              {classAssignments.length === 0 ? (
                <p className="text-xs text-slate-600 text-center py-4">
                  No assignments assigned.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {classAssignments.slice(0, 3).map((assign) => (
                    <div
                      key={assign.id}
                      onClick={() => setView("assignment-view")}
                      className="p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900/40 dark:hover:bg-slate-900 dark:border-white/5 dark:hover:border-white/10 transition-all text-left cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                          {assign.title}
                        </h4>
                        <p className="text-[9px] text-slate-500 dark:text-slate-500 mt-0.5">
                          {assign.subjectTitle} • Due {assign.deadline}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          assign.status === "Graded"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : assign.status === "Submitted"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {assign.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
