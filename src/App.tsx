import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useLmsStore } from "./store/index";
import { 
  Video, 
  Tv, 
  Calendar, 
  Users, 
  FileText, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  GraduationCap 
} from "lucide-react";
import { academicAPI } from "./services/api";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { CourseLearningPage } from "./components/CourseLearningPage";
import { QuizInterface } from "./components/QuizInterface";
import { AssignmentPage } from "./components/AssignmentPage";
import { StudentProfile } from "./components/StudentProfile";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { AdminPortal } from "./components/AdminPortal";
import { AITutor } from "./components/AITutor";
import { SubmissionsPage } from "./components/SubmissionsPage";
import { StudentGradesPage } from "./components/StudentGradesPage";
import { RoomContainer } from "./components/LiveClass/RoomContainer";
import { getApiBaseUrl } from "./utils/apiBase";
import { NotesResourcesPage } from "./components/NotesResourcesPage";
import { ParentPortal } from "./components/ParentPortal";
import { DemoPanel } from "./components/DemoPanel";
import { GetCredentialsPage } from "./components/GetCredentialsPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";

function RoomJoinFallback() {
  const { setView, joinLiveRoom, profile } = useLmsStore();
  const [code, setCode] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedClass, setSelectedClass] = useState("Class 11");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");

  // States for Teacher Calendar & Scheduling Workspace
  const [meetings, setMeetings] = useState<any[]>([]);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-indexed
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [formData, setFormData] = useState({
    classLevel: "Class 12",
    date: `${today.getDate().toString().padStart(2,"0")}/${(today.getMonth()+1).toString().padStart(2,"0")}/${today.getFullYear()}`,
    type: "Live Class",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    title: "",
    description: "",
    sendLink: true,
  });

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleNextMonth = () => {
    // Cap at December 2026
    if (calYear === 2026 && calMonth === 11) return;
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else { setCalMonth(m => m + 1); }
    setSelectedDay(1);
  };

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
    if (profile?.role === "teacher") {
      fetchMeetings();
      const interval = setInterval(fetchMeetings, 6000);
      return () => clearInterval(interval);
    }
  }, [profile?.role]);

  const handleDaySelect = (dayNum: number) => {
    setSelectedDay(dayNum);
    const formattedDay = dayNum.toString().padStart(2, "0");
    const formattedMonth = (calMonth + 1).toString().padStart(2, "0");
    setFormData((prev) => ({
      ...prev,
      date: `${formattedDay}/${formattedMonth}/${calYear}`,
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

  const handleJoinClass = async () => {
    if (!code.trim()) return;
    setErrorMsg("");
    setLoading(true);

    // Uppercase and alphanumeric for 8-char auto-codes, fallback to slug for legacy
    const trimmed = code.trim().toUpperCase();
    const normalizedCode = /^[A-Z0-9]{8}$/.test(trimmed)
      ? trimmed
      : code.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (profile?.role === "student") {
      const authToken = localStorage.getItem("auth_token");
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/live-class/mock/verify?roomName=${encodeURIComponent(normalizedCode)}`, {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
        });
        if (res.status === 403) {
          setErrorMsg("Access denied: You are not enrolled in the class for this meeting.");
        } else if (res.ok) {
          const data = await res.json();
          if (data.exists) {
            joinLiveRoom({
              roomName: normalizedCode,
              participantName: profile.name,
              isTeacher: false
            });
          } else {
            setErrorMsg("Invalid or inactive Room Code. Please wait for the teacher to start the session.");
          }
        } else {
          setErrorMsg("Could not verify room status. Please try again.");
        }
      } catch (err) {
        setErrorMsg("Network error: Could not reach verification endpoint.");
      } finally {
        setLoading(false);
      }
    } else {
      // Teachers can start/join any room code directly
      (window as any)._activeTeacherSubject = selectedSubject || "General Lecture";
      (window as any)._activeTeacherClass = selectedClass;
      joinLiveRoom({
        roomName: normalizedCode,
        participantName: profile.name,
        isTeacher: true
      });
      setLoading(false);
    }
  };

  if (profile?.role === "teacher") {
    return (
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
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
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
                <p className="text-[10px] text-slate-500">Schedule and notify students instantly.</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Select Class</label>
                <select
                  value={formData.classLevel}
                  onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
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
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meeting Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                  >
                    <option value="Live Class">Live Class</option>
                    <option value="Doubt Room">Doubt Room</option>
                    <option value="Parent Meeting">Parent Meeting</option>
                    <option value="Extra Session">Extra Session</option>
                  </select>
                </div>
              </div>

              {/* Start Time & End Time — react-time-picker */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
                  <div className="nexora-timepicker-wrap">
                    <TimePicker
                      onChange={(val) => {
                        if (!val) return;
                        const [h, m] = val.split(":");
                        const hour = parseInt(h, 10);
                        const ampm = hour >= 12 ? "PM" : "AM";
                        const displayH = hour % 12 === 0 ? 12 : hour % 12;
                        setFormData({ ...formData, startTime: `${displayH.toString().padStart(2,"0")}:${m} ${ampm}` });
                      }}
                      value={(() => {
                        const match = formData.startTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
                        if (!match) return "09:00";
                        let h = parseInt(match[1]);
                        const m = match[2];
                        const ap = match[3].toUpperCase();
                        if (ap === "PM" && h < 12) h += 12;
                        if (ap === "AM" && h === 12) h = 0;
                        return `${h.toString().padStart(2,"0")}:${m}`;
                      })()}
                      format="hh:mm a"
                      clockIcon={null}
                      clearIcon={null}
                      disableClock
                      className="nexora-timepicker"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">End Time</label>
                  <div className="nexora-timepicker-wrap">
                    <TimePicker
                      onChange={(val) => {
                        if (!val) return;
                        const [h, m] = val.split(":");
                        const hour = parseInt(h, 10);
                        const ampm = hour >= 12 ? "PM" : "AM";
                        const displayH = hour % 12 === 0 ? 12 : hour % 12;
                        setFormData({ ...formData, endTime: `${displayH.toString().padStart(2,"0")}:${m} ${ampm}` });
                      }}
                      value={(() => {
                        const match = formData.endTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
                        if (!match) return "10:00";
                        let h = parseInt(match[1]);
                        const m = match[2];
                        const ap = match[3].toUpperCase();
                        if (ap === "PM" && h < 12) h += 12;
                        if (ap === "AM" && h === 12) h = 0;
                        return `${h.toString().padStart(2,"0")}:${m}`;
                      })()}
                      format="hh:mm a"
                      clockIcon={null}
                      clearIcon={null}
                      disableClock
                      className="nexora-timepicker"
                    />
                  </div>
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
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea
                  placeholder="Add agenda, resources, or preparation notes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs focus:outline-none focus:border-brand-royal text-slate-800 dark:text-white h-20 resize-none"
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
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {MONTH_NAMES[calMonth]} {calYear}
              </h4>
              {/* Only forward arrow, disabled at December 2026 */}
              <button
                onClick={handleNextMonth}
                disabled={calYear === 2026 && calMonth === 11}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-600 dark:text-slate-350 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>

            {/* Calendar Days Grid */}
            {(() => {
              const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
              // 0=Sun,1=Mon...6=Sat — offset of the 1st
              const firstDayOffset = new Date(calYear, calMonth, 1).getDay();
              const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const monthStr = `${calYear}-${(calMonth + 1).toString().padStart(2, "0")}`;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Leading empty cells */}
                    {Array.from({ length: firstDayOffset }, (_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const dayNum = i + 1;
                      const dateStr = `${monthStr}-${dayNum.toString().padStart(2, "0")}`;
                      const dayMeetings = meetings.filter((m) => m.date === dateStr);
                      const isSelected = selectedDay === dayNum && calMonth === calMonth && calYear === calYear;
                      const dayDate = new Date(calYear, calMonth, dayNum);
                      const isPast = dayDate < todayMidnight;

                      if (isPast) {
                        // Shaded, non-clickable past day
                        return (
                          <div
                            key={dayNum}
                            className="aspect-square relative rounded-none border flex flex-col items-center justify-between p-1.5 bg-slate-100 dark:bg-slate-800/40 border-slate-150 dark:border-white/[0.03] opacity-40 cursor-not-allowed select-none"
                          >
                            <span className="text-xs font-extrabold text-slate-400 dark:text-slate-600">{dayNum}</span>
                            {dayMeetings.length > 0 && (
                              <span className="text-[8px] font-bold leading-none text-slate-400 flex items-center gap-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                <span>{dayMeetings.length}</span>
                              </span>
                            )}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={dayNum}
                          onClick={() => handleDaySelect(dayNum)}
                          className={`aspect-square relative rounded-none border flex flex-col items-center justify-between p-1.5 transition-all group ${
                            isSelected
                              ? "bg-brand-royal border-brand-royal text-white shadow-md shadow-brand-royal/10"
                              : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
                          }`}
                        >
                          <span className="text-xs font-extrabold">{dayNum}</span>
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
              );
            })()}

            {/* Selected Day Meetings List */}
            {(() => {
              const monthStr = `${calYear}-${(calMonth + 1).toString().padStart(2, "0")}`;
              const dayStr = `${monthStr}-${selectedDay.toString().padStart(2, "0")}`;
              const dayMeetings = meetings.filter((m) => m.date === dayStr);
              return (
                <div className="border-t border-slate-200 dark:border-white/5 pt-4 space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Meetings on {selectedDay} {MONTH_NAMES[calMonth]} {calYear}
                  </h5>

                  {dayMeetings.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-550 py-2">
                      No classes or meetings scheduled for this date.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {dayMeetings.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-white/10 rounded-none flex items-center justify-between text-xs hover:border-slate-300 dark:hover:border-white/20 transition-all"
                        >
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 dark:text-white">{m.title}</span>
                              <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold rounded">{m.type}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                              {m.classLevel} • {m.startTime} - {m.endTime}
                            </p>
                            <p className="text-[10px] text-slate-550 dark:text-slate-450 font-mono mt-0.5">
                              Code: <span className="bg-slate-100 dark:bg-slate-950 px-1 rounded font-semibold">{m.roomName}</span>
                            </p>
                            {m.description && (
                              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1.5 italic border-l border-slate-300 dark:border-slate-700 pl-1.5">
                                "{m.description}"
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {m.status === "Upcoming" && (
                              <button onClick={() => handleGoLive(m)} className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9px] uppercase tracking-wider transition active:scale-95 shrink-0 rounded">
                                Go Live
                              </button>
                            )}
                            {m.status === "Live" && (
                              <button onClick={() => handleCompleteMeeting(m)} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] uppercase tracking-wider transition active:scale-95 shrink-0 rounded">
                                Complete
                              </button>
                            )}
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none border shrink-0 ${
                              m.status === "Completed" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : m.status === "Live" ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 animate-pulse"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                            }`}>{m.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-slate-300">
      <div className="glass-card rounded-none p-8 border-slate-200 dark:border-white/5 bg-slate-900/50 flex flex-col items-center max-w-md w-full shadow-2xl">
        <div className="w-16 h-16 bg-brand-royal/20 rounded-none flex items-center justify-center mb-4 border border-white/5">
          <span className="text-2xl">🔒</span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-white uppercase tracking-wider">Join Secure Session</h2>
        <p className="text-xs text-slate-400 mb-6 text-center leading-normal">
          Enter the room code provided by your teacher to connect to the End-to-End Encrypted stream.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-none bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center w-full">
            {errorMsg}
          </div>
        )}
        
        <input 
          type="text" 
          placeholder="Enter the room code" 
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErrorMsg("");
          }}
          className="w-full bg-slate-950 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-royal transition-colors mb-4 text-center font-mono tracking-widest uppercase"
        />
        
        <div className="flex gap-3 w-full">
          <button 
            onClick={() => setView("student-dash")} 
            className="flex-1 py-3 rounded-none bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 font-semibold text-xs transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            onClick={handleJoinClass}
            disabled={!code.trim() || loading}
            className="flex-1 bg-brand-royal hover:bg-brand-royal/90 text-white py-3 rounded-none text-xs font-semibold disabled:opacity-50 transition-colors uppercase tracking-wider"
          >
            {loading ? "Verifying..." : "Join Class"}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { activeView, isDarkMode, setView, profile, boards, liveRoomState, auth } = useLmsStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("auth_token");

  // Load academic structure from API when available
  useEffect(() => {
    academicAPI
      .getFullStructure()
      .then((boards) => {
        if (boards?.length) {
          useLmsStore.setState({ boards });
        }
      })
      .catch(() => {
        // keep demo boards when API is offline
      });

    // Initial notifications and assignments load and polling setup
    const fetchNotifs = useLmsStore.getState().fetchNotifications;
    const fetchAssigns = useLmsStore.getState().fetchAssignments;
    fetchNotifs();
    fetchAssigns();
    
    const interval = setInterval(() => {
      fetchNotifs();
      fetchAssigns();
    }, 8000);
    return () => clearInterval(interval);
  }, [profile?.id]);

  // Synchronize mock IDs to database UUIDs whenever boards or profile changes
  useEffect(() => {
    if (boards?.length > 0 && profile && profile.id) {
      let updated = false;
      const newProfile = { ...profile };

      // 1. Board ID mapping
      const matchedBoard = boards.find(
        (b) =>
          b.id === profile.selectedBoardId ||
          b.code?.toLowerCase() === profile.selectedBoardId?.toLowerCase(),
      );
      if (matchedBoard && matchedBoard.id !== profile.selectedBoardId) {
        newProfile.selectedBoardId = matchedBoard.id;
        updated = true;
      }

      // 2. Class ID mapping
      const activeBoard = matchedBoard || boards[0];
      if (activeBoard) {
        const matchedClass = activeBoard.classes?.find(
          (c) =>
            c.id === profile.selectedClassId ||
            c.title?.toLowerCase().replace(/\s+/g, "-") ===
              profile.selectedClassId?.toLowerCase().replace(/\s+/g, "-") ||
            (c.title === "Class 12" &&
              profile.selectedClassId === "class-12") ||
            (c.title === "Class 9" && profile.selectedClassId === "class-9"),
        );
        if (matchedClass && matchedClass.id !== profile.selectedClassId) {
          newProfile.selectedClassId = matchedClass.id;
          updated = true;
        }

        // 3. Subject ID mapping
        const activeClass = matchedClass || activeBoard.classes?.[0];
        if (activeClass) {
          const matchedSubject = activeClass.subjects?.find(
            (s) =>
              s.id === profile.optedSubjectId ||
              s.title?.toLowerCase() ===
                profile.optedSubjectId?.toLowerCase() ||
              s.title?.toLowerCase().replace(/\s+/g, "-") ===
                profile.optedSubjectId?.toLowerCase().replace(/\s+/g, "-") ||
              (s.title === "Mathematics" &&
                profile.optedSubjectId === "maths-12") ||
              (s.title === "Chemistry" &&
                profile.optedSubjectId === "chemistry-12") ||
              (s.title === "Physics" &&
                profile.optedSubjectId === "physics-12"),
          );
          if (matchedSubject && matchedSubject.id !== profile.optedSubjectId) {
            newProfile.optedSubjectId = matchedSubject.id;
            updated = true;
          }
        }
      }

      if (updated) {
        useLmsStore.setState({
          profile: newProfile,
          activeSubjectId: newProfile.optedSubjectId,
        });
      }
    }
  }, [boards, profile]);

  // Sync URL hash with the store's activeView to support browser back/forward buttons
  useEffect(() => {
    const publicViews = [
      "landing",
      "login",
      "login-student",
      "login-educator",
      "signup",
      "ai-tutor",
      "quiz-view",
      "get-credentials",
      "forgot-password",
      "reset-password",
    ];

    const initialHash = window.location.hash.replace(/^#\/?/, "").split("?")[0] || "landing";
    const isAuthenticated = auth.isAuthenticated && !!token;

    const getDashboardView = () => {
      if (profile?.role === "student") return "student-dash";
      if (profile?.role === "teacher") return "teacher-dash";
      return "admin-analytics";
    };

    if (!isAuthenticated && !publicViews.includes(initialHash)) {
      setView("login-student");
      window.location.hash = "/login-student";
    } else if (isAuthenticated && (initialHash === "login" || initialHash === "login-student" || initialHash === "login-educator" || initialHash === "signup" || initialHash === "landing")) {
      const dash = getDashboardView();
      setView(dash);
      window.location.hash = "/" + dash;
    } else if (publicViews.includes(initialHash)) {
      setView(initialHash);
    } else {
      setView(initialHash);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "").split("?")[0] || "landing";
      if (!isAuthenticated && !publicViews.includes(hash)) {
        setView("login-student");
        window.location.hash = "/login-student";
      } else if (isAuthenticated && (hash === "login" || hash === "login-student" || hash === "login-educator" || hash === "signup" || hash === "landing")) {
        const dash = getDashboardView();
        setView(dash);
        window.location.hash = "/" + dash;
      } else {
        setView(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [setView, auth.isAuthenticated, token, profile]);

  // Keep URL hash in sync with activeView
  useEffect(() => {
    const currentHash = window.location.hash.replace(/^#\/?/, "").split("?")[0] || "landing";
    if (currentHash !== activeView) {
      window.location.hash = "/" + activeView;
    }
  }, [activeView]);

  // Define simple routing function based on state
  const renderActiveScreen = () => {
    switch (activeView) {
      case "student-dash":
        return <StudentDashboard />;
      case "course-view":
        return <CourseLearningPage />;
      case "notes-resources":
        return <NotesResourcesPage />;
      case "quiz-view":
        return <QuizInterface />;
      case "assignment-view":
        return <AssignmentPage />;
      case "given-grades":
        return <StudentGradesPage />;
      case "profile-view":
        return <StudentProfile />;
      case "teacher-dash":
        return <TeacherDashboard />;
      case "submissions":
        return <SubmissionsPage />;
      case "admin-structure":
      case "admin-analytics":
      case "admin-upload":
        return <AdminPortal />;
      case "parent-portal":
        return <ParentPortal />;
      case "ai-tutor":
        return <AITutor />;
      case "webrtc-live":
        if (!liveRoomState) {
          return <RoomJoinFallback />;
        }
        return <RoomContainer roomName={liveRoomState.roomName} participantName={liveRoomState.participantName} isTeacher={liveRoomState.isTeacher} />;
      case "forgot-password":
        return <ForgotPasswordPage />;
      case "reset-password":
        return <ResetPasswordPage />;
      default:
        return <StudentDashboard />;
    }
  };

  const isPublicPage =
    activeView === "landing" ||
    activeView === "login" ||
    activeView === "login-student" ||
    activeView === "login-educator" ||
    activeView === "signup" ||
    activeView === "ai-tutor" ||
    activeView === "quiz-view" ||
    activeView === "get-credentials" ||
    activeView === "forgot-password" ||
    activeView === "reset-password";

  const shouldShowProtected = auth.isAuthenticated && !!token && !isPublicPage;

  return (
    <div
      className={`${isDarkMode ? "dark" : "light"} min-h-screen bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-slate-100 transition-colors duration-300`}
    >
      {shouldShowProtected ? (
        // Dashboard Shell structure
        <div className="flex min-h-screen">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-x-hidden">
            <Header onToggleSidebar={() => setIsSidebarOpen(true)} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {renderActiveScreen()}
            </main>
          </div>
        </div>
      ) : (
        // Public / Full-page screens do not require standard Sidebar/Header shells
        <>
          {activeView === "landing" && <LandingPage />}
          {activeView === "login" && <LoginPage />}
          {activeView === "login-student" && <LoginPage mode="student" />}
          {activeView === "login-educator" && <LoginPage mode="educator" />}
          {activeView === "signup" && <SignupPage />}
          {activeView === "ai-tutor" && <AITutor />}
          {activeView === "quiz-view" && <QuizInterface />}
          {activeView === "get-credentials" && <GetCredentialsPage />}
          {activeView === "forgot-password" && <ForgotPasswordPage />}
          {activeView === "reset-password" && <ResetPasswordPage />}
          {!isPublicPage && !auth.isAuthenticated && <LoginPage />}
        </>
      )}
      <DemoPanel />
    </div>
  );
}

export default App;
