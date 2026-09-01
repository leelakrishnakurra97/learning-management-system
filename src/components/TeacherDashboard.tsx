import React, { useState, useEffect } from "react";
import { useLmsStore } from "../store/index";
import { getApiBaseUrl } from "../utils/apiBase";
import type { Assignment } from "../store/types";
import {
  Users,
  Star,
  BookOpen,
  FileText,
  ArrowRight,
  Upload,
  PenTool,
  ChevronRight,
  Clock,
  TrendingUp,
  GraduationCap,
  Calendar,
} from "lucide-react";

export const TeacherDashboard: React.FC = () => {
  const { assignments, gradeAssignment, setView, boards, profile } = useLmsStore();
  const [gradingAssignId, setGradingAssignId] = useState<string | null>(null);
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"overview" | "meetings">("overview");

  // Meetings schedule state initialized with mocks, updated by DB
  const [meetings, setMeetings] = useState<any[]>([]);

  const fetchMeetings = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/live-classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.meetings) {
          setMeetings(data.meetings);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch DB live classes:", err);
    }
  };

  useEffect(() => {
    fetchMeetings();
    const interval = setInterval(fetchMeetings, 6000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const todayDay = today.getDate();
  const todayFormatted = `${todayDay.toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;

  const [selectedDay, setSelectedDay] = useState(todayDay);

  const [formData, setFormData] = useState({
    classLevel: "Class 12",
    date: todayFormatted,
    type: "Live Class",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    title: "",
    description: "",
    sendLink: true,
  });

  const handleDaySelect = (dayNum: number) => {
    setSelectedDay(dayNum);
    const formattedDay = dayNum.toString().padStart(2, "0");
    setFormData((prev) => ({
      ...prev,
      date: `${formattedDay}/06/2026`,
    }));
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateParts = formData.date.split("/");
    const dbDate =
      dateParts.length === 3
          ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
          : `2026-06-${selectedDay.toString().padStart(2, "0")}`;

    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/live-classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          classLevel: formData.classLevel,
          date: dbDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          type: formData.type,
          description: formData.description,
        })
      });

      if (res.ok) {
        const data = await res.json();
        const autoCode = data?.liveClass?.meetingUrl || "";
        setGeneratedRoomCode(autoCode);
        fetchMeetings();
        setFormData((prev) => ({
          ...prev,
          title: "",
          description: "",
        }));
        useLmsStore.getState().addNotification(
          "Meeting Scheduled",
          `Meeting "${formData.title}" scheduled! Join Code: ${autoCode}`,
          "success"
        );
      }
    } catch (err) {
      console.warn("Failed to schedule meeting:", err);
    }
  };

  const handleGoLive = async (m: any) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/live-class/${m.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "Live" })
      });

      if (res.ok) {
        // Configure global mock variables for video call identity mapping
        (window as any)._activeTeacherSubject = m.subjectTitle || "General Lecture";
        (window as any)._activeTeacherClass = m.classLevel;

        useLmsStore.getState().joinLiveRoom({
          roomName: m.roomName,
          participantName: profile.name,
          isTeacher: true
        });
        setView("webrtc-live");
      }
    } catch (err) {
      console.warn("Failed to transition status to live:", err);
    }
  };

  const handleCompleteMeeting = async (m: any) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/live-class/${m.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "Completed" })
      });

      if (res.ok) {
        fetchMeetings();
      }
    } catch (err) {
      console.warn("Failed to complete live class:", err);
    }
  };

  // Derive counts
  const liveCount = meetings.filter((m) => m.status === "Live").length;
  const upcomingCount = meetings.filter((m) => m.status === "Upcoming").length;
  const completedCount = meetings.filter((m) => m.status === "Completed").length;

  const teacherSubject = React.useMemo(() => {
    if (profile.subjectArea) return profile.subjectArea;
    for (const board of boards) {
      for (const classLevel of board.classes) {
        for (const sub of classLevel.subjects) {
          if (sub.id === profile.optedSubjectId) {
            return sub.title;
          }
        }
      }
    }
    return "Mathematics";
  }, [boards, profile.optedSubjectId, profile.subjectArea]);

  // Grading form states
  const [score, setScore] = useState("45");
  const [feedback, setFeedback] = useState(
    "Great analytical work. Make sure to detail the boundary conditions in your next electrochemistry graph.",
  );

  const submittedAssignments = assignments.filter(
    (a) => a.status === "Submitted",
  );

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingAssignId) return;

    gradeAssignment(gradingAssignId, `${score}/100`, feedback);

    // Add notification to student
    useLmsStore
      .getState()
      .addNotification(
        "Assignment Graded",
        `Your submission has been graded: ${score}/100. Check feedback details.`,
        "success",
      );

    setGradingAssignId(null);
  };

  const kpis = [
    {
      label: "Active Cohort Students",
      value: "450",
      subtitle: "Scholars",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Course Satisfaction",
      value: "4.92",
      subtitle: "out of 5.0",
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Published Content",
      value: "78",
      subtitle: "Hours",
      icon: BookOpen,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      label: "Pending Reviews",
      value: String(submittedAssignments.length),
      subtitle: submittedAssignments.length === 1 ? "Paper" : "Papers",
      icon: FileText,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  // Current hour greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Welcome Header */}
      <div className="glass-card rounded-none p-6 border-slate-200 dark:border-white/5 bg-gradient-to-r from-brand-royal/5 via-brand-violet/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {greeting}, {profile.name} ({teacherSubject} Professor)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Here's your teaching overview for today.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b border-slate-200 dark:border-white/5 pb-1 gap-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "overview"
              ? "border-brand-royal text-brand-royal dark:text-white"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("meetings")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "meetings"
              ? "border-brand-royal text-brand-royal dark:text-white"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Meeting Planner</span>
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-none p-5 border-slate-200 dark:border-white/5 flex flex-col gap-3"
                >
                  <div className={`w-9 h-9 rounded-none ${kpi.bg} ${kpi.border} border flex items-center justify-center ${kpi.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block leading-none">
                      {kpi.value}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold mt-0.5 block">
                      {kpi.subtitle}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    {kpi.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main Grid: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Quick Actions (3/5 width) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-royal" />
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  Quick Actions
                </h3>
              </div>

              {/* Quick Creator shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-none p-5 border-slate-200 dark:border-white/5 bg-brand-royal/5 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <div className="w-10 h-10 rounded-none bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-brand-royal" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
                      Upload Material
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Publish HD lectures, PDFs, and textbook chapters.
                    </p>
                  </div>
                  <button
                    onClick={() => setView("content-upload")}
                    className="mt-4 py-2.5 rounded-none bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-950 hover:border-brand-royal/30 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <span>Open upload center</span>
                    <ChevronRight className="w-4 h-4 text-brand-royal" />
                  </button>
                </div>

                <div className="glass-card rounded-none p-5 border-slate-200 dark:border-white/5 bg-emerald-500/5 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <div className="w-10 h-10 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
                      View Submissions
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Review and grade homework submissions by class level.
                    </p>
                  </div>
                  <button
                    onClick={() => setView("submissions")}
                    className="mt-4 py-2.5 rounded-none bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-950 hover:border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <span>View submissions</span>
                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Homework Submissions Review Tray (2/5 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  Grading Queue
                </h3>
              </div>

              {/* Homework Action Panel */}
              <div className="glass-card rounded-none p-5 border-slate-200 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-royal" />
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                      Submissions
                    </h3>
                  </div>
                  {submittedAssignments.length > 0 && (
                    <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold px-2.5 py-1 rounded-none">
                      {submittedAssignments.length} {submittedAssignments.length === 1 ? "Paper" : "Papers"}
                    </span>
                  )}
                </div>

                {submittedAssignments.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                      No homework sheets awaiting review.
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">
                      Submissions will appear here once students submit.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submittedAssignments.map((a) => (
                      <div
                        key={a.id}
                        className="p-4 rounded-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-xs text-left space-y-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate">
                              {a.title}
                            </h4>
                            <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5 block">
                              {a.subjectTitle} • Submitted by {a.studentName || "Prathamesh"}
                            </span>
                          </div>
                          <span className="text-[9px] text-brand-royal dark:text-brand-royal-300 font-mono font-bold bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded-none border border-slate-300 dark:border-white/5 flex-shrink-0">
                            .pdf
                          </span>
                        </div>

                        {gradingAssignId === a.id ? (
                          <form
                            onSubmit={handleGradeSubmit}
                            className="space-y-3 border-t border-slate-200 dark:border-white/5 pt-3 animate-fade-in-up"
                          >
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">
                                Score / Grade
                              </label>
                              <input
                                type="text"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="premium-input rounded-none text-[11px] py-1.5"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">
                                Feedback
                              </label>
                              <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="premium-input rounded-none text-[11px] py-1.5 h-20 resize-none"
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setGradingAssignId(null)}
                                className="w-1/3 py-2 rounded-none bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-white/5 text-[10px] text-slate-700 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-2/3 premium-btn-primary rounded-none py-2 text-[10px]"
                              >
                                Submit Grade
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setGradingAssignId(a.id);
                              setScore("92");
                              setFeedback("Superb conceptual breakdown of cells.");
                            }}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-300 dark:border-white/5 hover:border-brand-royal/30 text-slate-800 dark:text-white rounded-none text-[10px] font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Evaluate Paper</span>
                            <ArrowRight className="w-3.5 h-3.5 text-brand-royal" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "meetings" && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Header Card */}
          <div className="glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] text-brand-royal dark:text-brand-royal-light font-bold uppercase tracking-wider border border-brand-royal/20 px-2.5 py-1 inline-flex items-center gap-1">
                📅 Nexora Learning Meeting Planner
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-3">
                Schedule Meeting
              </h3>
              <p className="text-xs text-slate-650 dark:text-slate-400 mt-1 max-w-xl">
                Create live classes, doubt rooms, parent meetings, and extra sessions while reviewing attendance history from one calendar view.
              </p>
            </div>
            
            {/* KPI Boxes */}
            <div className="flex gap-4">
              <div className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 px-5 py-3 rounded-none text-center min-w-[80px]">
                <span className="text-xl font-extrabold text-red-500 block leading-none">{liveCount}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 block">Live</span>
              </div>
              <div className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 px-5 py-3 rounded-none text-center min-w-[80px]">
                <span className="text-xl font-extrabold text-blue-500 block leading-none">{upcomingCount}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 block">Upcoming</span>
              </div>
              <div className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 px-5 py-3 rounded-none text-center min-w-[80px]">
                <span className="text-xl font-extrabold text-emerald-500 block leading-none">{completedCount}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 block">Completed</span>
              </div>
            </div>
          </div>

          {/* Two Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {/* Left: Create Meeting Form (5/12 cols) */}
            <div className="lg:col-span-5 glass-card p-6 border-slate-200 dark:border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Create Meeting</h4>
                  <p className="text-[10px] text-slate-555">Schedule and notify students instantly.</p>
                </div>
                <div className="w-8 h-8 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <form onSubmit={handleCreateMeeting} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Select Class</label>
                  <select
                    value={formData.classLevel}
                    onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Select Date</label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meeting Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                    >
                      <option value="Live Class">Live Class</option>
                      <option value="Doubt Room">Doubt Room</option>
                      <option value="Parent Meeting">Parent Meeting</option>
                      <option value="Extra Session">Extra Session</option>
                    </select>
                  </div>
                </div>

                {generatedRoomCode && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 rounded">
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-0.5">✅ Auto-Generated Join Code</p>
                      <p className="font-mono text-sm font-extrabold text-emerald-800 dark:text-emerald-300 tracking-[0.2em]">{generatedRoomCode}</p>
                      <p className="text-[9px] text-emerald-600 dark:text-emerald-500 mt-0.5">Sent to all enrolled students via notification & email</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(generatedRoomCode)}
                      className="text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 font-bold transition"
                    >
                      Copy
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meeting Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Class 12 Physics live revision"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                  <textarea
                    placeholder="Add agenda, resources, or preparation notes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white h-20 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="sendLink"
                    checked={formData.sendLink}
                    onChange={(e) => setFormData({ ...formData, sendLink: e.target.checked })}
                    className="rounded text-brand-royal focus:ring-brand-royal w-4 h-4"
                  />
                  <label htmlFor="sendLink" className="text-xs text-slate-700 dark:text-slate-300 font-bold select-none cursor-pointer">
                    Send Meeting Link to Students
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-royal hover:bg-brand-royal/90 text-white rounded-none text-xs font-bold transition-all shadow-md shadow-brand-royal/10 active:scale-95 uppercase tracking-wider"
                >
                  Schedule Meeting
                </button>
              </form>
            </div>

            {/* Right: Calendar View (7/12 cols) */}
            <div className="lg:col-span-7 glass-card p-6 border-slate-200 dark:border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">June 2026</h4>

                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-650 dark:text-slate-350 transition-colors">
                    &lt;
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-650 dark:text-slate-350 transition-colors">
                    &gt;
                  </button>
                </div>
              </div>

              {/* Calendar Days Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cell for June 2026 starts on Mon */}
                  <div className="aspect-square bg-slate-50/10 dark:bg-slate-950/10 border border-slate-100/10 dark:border-white/5 rounded-none opacity-30 flex items-center justify-center text-[10px]">
                    31
                  </div>

                  {Array.from({ length: 30 }, (_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `2026-06-${dayNum.toString().padStart(2, "0")}`;
                    const dayMeetings = meetings.filter((m) => m.date === dateStr);
                    const isSelected = selectedDay === dayNum;

                    return (
                      <button
                        key={dayNum}
                        onClick={() => handleDaySelect(dayNum)}
                        className={`aspect-square relative rounded-none border flex flex-col items-center justify-between p-1.5 transition-all group ${
                          isSelected
                            ? "bg-brand-royal border-brand-royal text-white shadow-md shadow-brand-royal/10"
                            : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-105 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xs font-extrabold">{dayNum}</span>
                        
                        {/* Dot indicator */}
                        {dayMeetings.length > 0 && (
                          <span className={`text-[8px] font-bold leading-none ${
                            isSelected ? "text-white/95" : "text-brand-royal dark:text-brand-royal-light"
                          } flex items-center gap-0.5`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span>{dayMeetings.length}</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Day Meetings List */}
              <div className="border-t border-slate-200 dark:border-white/5 pt-4 space-y-3">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Meetings on {selectedDay} June 2026
                </h5>

                {meetings.filter((m) => m.date === `2026-06-${selectedDay.toString().padStart(2, "0")}`).length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-500 py-2">
                    No classes or meetings scheduled for this date.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {meetings
                      .filter((m) => m.date === `2026-06-${selectedDay.toString().padStart(2, "0")}`)
                      .map((m) => (
                        <div
                          key={m.id}
                          className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-white/10 rounded-none flex items-center justify-between text-xs hover:border-slate-300 dark:hover:border-white/20 transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 dark:text-white">{m.title}</span>
                              <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold rounded">
                                {m.type}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                              {m.classLevel} • {m.startTime} - {m.endTime}
                            </p>
                            {m.description && (
                              <p className="text-[10px] text-slate-600 dark:text-slate-450 mt-0.5 italic">
                                "{m.description}"
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {m.status === "Upcoming" && (
                              <button
                                onClick={() => handleGoLive(m)}
                                className="px-2.5 py-1 bg-red-650 hover:bg-red-700 text-white font-extrabold text-[9px] uppercase tracking-wider transition active:scale-95 flex items-center gap-1 shrink-0 rounded"
                              >
                                Go Live
                              </button>
                            )}
                            {m.status === "Live" && (
                              <>
                                <button
                                  onClick={() => handleGoLive(m)}
                                  className="px-2.5 py-1 bg-brand-royal hover:bg-brand-royal/90 text-white font-extrabold text-[9px] uppercase tracking-wider transition active:scale-95 flex items-center gap-1 shrink-0 rounded"
                                >
                                  Join Room
                                </button>
                                <button
                                  onClick={() => handleCompleteMeeting(m)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] uppercase tracking-wider transition active:scale-95 flex items-center gap-1 shrink-0 rounded"
                                >
                                  Complete
                                </button>
                              </>
                            )}
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none border shrink-0 ${
                              m.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : m.status === "Live"
                                  ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 animate-pulse"
                                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                            }`}>
                              {m.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
