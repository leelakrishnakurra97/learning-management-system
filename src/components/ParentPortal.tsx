import React, { useState } from "react";
import { useLmsStore } from "../store/index";
import {
  User,
  BookOpen,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  Mail,
  Award,
  Activity,
  Sparkles,
  ShieldCheck,
  Percent,
} from "lucide-react";

export const ParentPortal: React.FC = () => {
  const { profile, assignments, quizResults, boards } = useLmsStore();
  const [parentName] = useState("Mr. Sharma");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [sentFeedback, setSentFeedback] = useState(false);

  // Student active details
  const activeBoard = boards.find((b) => b.id === profile.selectedBoardId) || boards[0];
  const activeClass = activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) || activeBoard?.classes?.[0];

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;
    setSentFeedback(true);
    setTimeout(() => {
      setFeedbackMsg("");
      setSentFeedback(false);
      alert("Your message has been sent to the class coordinator.");
    }, 1500);
  };

  // Mock data for parent portal
  const attendanceRate = "96.4%";
  const totalClassesAttended = 54;
  const totalClassesHeld = 56;
  const overallGrade = "A+ (92.5%)";

  const recentActivities = [
    { id: 1, time: "Today, 10:15 AM", type: "live", desc: "Attended WebRTC Live class for Mathematics (Matrices)" },
    { id: 2, time: "Yesterday, 4:30 PM", type: "assignment", desc: "Submitted Assignment: 'Metallurgy Reaction Chart'" },
    { id: 3, time: "2 days ago, 2:15 PM", type: "quiz", desc: "Scored 90% (9/10) in Quiz: 'Matrices & Determinants'" },
    { id: 4, time: "3 days ago, 11:00 AM", type: "system", desc: "Reached Level 7 Scholar milestone and earned 50 bonus XP" },
  ];

  const schoolAnnouncements = [
    { id: 1, date: "June 25, 2026", title: "Quarterly Parent-Teacher Meeting (PTM)", desc: "Schedule slots online for the upcoming Virtual PTM with class coordinator and subject teachers." },
    { id: 2, date: "June 20, 2026", title: "Mid-Term Examination Timetable", desc: "The official dates and syllabi for classes 9 to 12 mid-term tests have been released. Downloads available in the main library portal." },
    { id: 3, date: "June 15, 2026", title: "Cloudflare WebRTC Live Class upgrade", desc: "We upgraded our servers to support 4K desktop sharing and automated interactive live quizzes." }
  ];

  return (
    <div className="space-y-6 font-sans text-left animate-fade-in-up">
      {/* Welcome & Overview Header */}
      <div className="glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-royal/10 blur-[80px] rounded-full" />
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-brand-royal flex items-center justify-center text-white shadow-lg shadow-brand-royal/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight flex flex-col sm:flex-row sm:items-center gap-2">
              <span>Parent Dashboard Console</span>
              <span className="text-[10px] w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Guardian Verified
              </span>
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">
              Logged in as <span className="font-semibold text-slate-900 dark:text-slate-200">{parentName}</span> • Monitoring Student: <span className="font-semibold text-brand-royal dark:text-brand-violet-light">{profile.name}</span>
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-500 font-semibold mt-1">
              Curriculum Standard: {activeBoard.title} / {activeClass?.title || "Class 12"}
            </p>
          </div>
        </div>

        {/* Global Performance Summary */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-center min-w-[110px]">
            <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
              {overallGrade}
            </span>
            <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">
              Overall Grade
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-center min-w-[110px]">
            <Activity className="w-5 h-5 text-brand-violet dark:text-brand-violet-light mx-auto" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
              {attendanceRate}
            </span>
            <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">
              Attendance
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side (2 Columns): Academic Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-wider block">Syllabus Completion</span>
              <div className="flex items-center gap-2 mt-2">
                <Percent className="w-5 h-5 text-brand-royal" />
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">78% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-brand-royal rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="glass-card p-4 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-wider block">Live Class Participation</span>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">{totalClassesAttended} / {totalClassesHeld}</span>
              </div>
              <p className="text-[9px] text-slate-600 dark:text-slate-500 mt-2 font-medium">96% session persistence rate</p>
            </div>

            <div className="glass-card p-4 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-wider block">Gamification Level</span>
              <div className="flex items-center gap-2 mt-2">
                <Award className="w-5 h-5 text-violet-500" />
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">Level {profile.level} Scholar</span>
              </div>
              <p className="text-[9px] text-slate-600 dark:text-slate-500 mt-2 font-medium">{profile.xp} total XP accumulated</p>
            </div>
          </div>

          {/* Assignments Status Table */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3 mb-4">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-royal" /> Homework &amp; Assignments Tracker
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 font-semibold px-2 py-0.5 rounded">
                Total: {assignments.length}
              </span>
            </div>
            
            {assignments.length === 0 ? (
              <p className="text-xs text-slate-600 dark:text-slate-500 py-6 text-center">No assignments published for this class.</p>
            ) : (
              <div className="space-y-3">
                {assignments.map((as) => (
                  <div key={as.id} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">{as.title}</p>
                      <p className="text-[10px] text-slate-500">Subject: {as.subjectTitle} • Deadline: {as.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                        as.status === "Graded" 
                          ? "bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : as.status === "Submitted"
                          ? "bg-blue-100 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/20 text-blue-700 dark:text-blue-400"
                          : "bg-amber-100 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/20 text-amber-700 dark:text-amber-400"
                      }`}>
                        {as.status}
                      </span>
                      {as.grade && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          Score: {as.grade}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Academic Report Card & Quizzes */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3 mb-4">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" /> Recent Quiz Audits ({quizResults?.length || 0})
              </h3>
            </div>

            {!quizResults || quizResults.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-slate-600 dark:text-slate-500">No recent quiz assessments completed by the student.</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-brand-royal bg-brand-royal/10 border border-brand-royal/20 px-3 py-1 rounded font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Direct the student to Homework Space to complete quizzes.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {quizResults.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">{r.title}</p>
                      <p className="text-[10px] text-slate-500">Taken on {r.date} • Spent {Math.round(r.timeTakenSeconds / 60)} mins</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Score: {r.score} / {r.totalQuestions}
                      </span>
                      <span className={`text-[9px] font-bold ${
                        (r.score / r.totalQuestions) >= 0.8 
                          ? "text-emerald-500" 
                          : (r.score / r.totalQuestions) >= 0.5 
                          ? "text-amber-500" 
                          : "text-red-500"
                      }`}>
                        {Math.round((r.score / r.totalQuestions) * 100)}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side (1 Column): Audit Log, Announcements, Message Coord */}
        <div className="space-y-6">
          
          {/* Audit Log / Student Timeline */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-3 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-500" /> Student Activity Audit Log
            </h3>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-royal mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold block">{act.time}</span>
                    <p className="text-slate-800 dark:text-slate-300 leading-normal font-medium">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School announcements */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-3 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" /> Important Notices
            </h3>
            <div className="space-y-4">
              {schoolAnnouncements.map((an) => (
                <div key={an.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[9px] font-bold text-brand-violet dark:text-brand-violet-light uppercase tracking-wider">
                    <span>{an.title}</span>
                    <span className="text-slate-600 dark:text-slate-500">{an.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                    {an.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact coordinator */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-3 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-royal" /> Contact Class Coordinator
            </h3>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet font-bold text-sm">
                TK
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Mrs. Tanvi Kulkarni</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-500">Class 12 Academic Coordinator</p>
                <p className="text-[9px] text-brand-violet font-mono flex items-center gap-1 mt-0.5"><Mail className="w-2.5 h-2.5" /> coordinator@nexora.edu</p>
              </div>
            </div>

            <form onSubmit={handleSendFeedback} className="space-y-3">
              <textarea
                placeholder="Send a secure message directly to the class coordinator..."
                value={feedbackMsg}
                onChange={(e) => setFeedbackMsg(e.target.value)}
                className="w-full premium-input text-xs h-20 resize-none font-medium"
                required
              />
              <button
                type="submit"
                disabled={sentFeedback || !feedbackMsg.trim()}
                className="w-full premium-btn-primary py-2 text-xs disabled:opacity-50"
              >
                <span>{sentFeedback ? "Sending Secure Link..." : "Send Message"}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
