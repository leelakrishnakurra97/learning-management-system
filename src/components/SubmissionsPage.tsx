import React, { useState, useEffect } from "react";
import { useLmsStore } from "../store/index";
import {
  FileText,
  Clock,
  User,
  Calendar,
  CheckCircle,
  Download,
  Award,
  AlertCircle,
  ChevronRight,
  Folder,
} from "lucide-react";

export const SubmissionsPage: React.FC = () => {
  const { assignments, gradeAssignment, fetchAssignments } = useLmsStore();
  const [selectedClass, setSelectedClass] = useState<string>("Class 9");
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<string>("100");
  const [gradeFeedback, setGradeFeedback] = useState<string>("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const classList = ["Class 9", "Class 10", "Class 11", "Class 12"];

  // Filter only items that have student submissions (status !== 'Pending') and match selected class
  const classSubmissions = assignments.filter((a) => {
    const isSubmitted = a.status === "Submitted" || a.status === "Graded";
    const matchesClass = a.className?.toLowerCase() === selectedClass.toLowerCase() ||
      (selectedClass === "Class 9" && a.className?.toLowerCase().includes("9")) ||
      (selectedClass === "Class 10" && a.className?.toLowerCase().includes("10")) ||
      (selectedClass === "Class 11" && a.className?.toLowerCase().includes("11")) ||
      (selectedClass === "Class 12" && a.className?.toLowerCase().includes("12"));
    return isSubmitted && matchesClass;
  });

  const handleGradeSubmit = async (e: React.FormEvent, assignmentId: string) => {
    e.preventDefault();
    if (!gradeScore) return;
    await gradeAssignment(assignmentId, `${gradeScore}/100`, gradeFeedback);
    setGradingId(null);
    setGradeScore("100");
    setGradeFeedback("");
  };

  const getFormatTime = (isoString?: string) => {
    if (!isoString) return "No timestamp";
    const d = new Date(isoString);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Student Submissions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review, check deadlines, and grade assignment submissions by class level.
          </p>
        </div>
      </div>

      {/* Class Selector Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/5 gap-2 overflow-x-auto">
        {classList.map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setSelectedClass(cls);
              setGradingId(null);
            }}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              selectedClass === cls
                ? "border-brand-royal text-brand-royal dark:text-white"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            {cls} Submissions
          </button>
        ))}
      </div>

      {/* Submissions List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Folder className="w-4 h-4 text-brand-royal" /> {selectedClass} Submission Log ({classSubmissions.length})
            </h3>

            {classSubmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/5 bg-slate-50/20 dark:bg-slate-950/10">
                <div className="mb-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-royal dark:text-brand-royal-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-300 tracking-wider uppercase">
                  No Submissions Yet
                </h5>
                <p className="text-[11px] text-slate-500 max-w-[220px] mt-1.5 leading-relaxed">
                  No students have uploaded answers for {selectedClass} assignments yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {classSubmissions.map((sub) => {
                  const isGraded = sub.status === "Graded";
                  const isPastDeadline = sub.rawDeadline && sub.submittedAt && new Date(sub.submittedAt) > new Date(sub.rawDeadline);
                  return (
                    <div
                      key={sub.id}
                      className={`p-4 rounded-xl border transition-all ${
                        gradingId === sub.id
                          ? "border-brand-royal bg-brand-royal/5"
                          : "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold bg-brand-royal/10 text-brand-royal px-2 py-0.5 rounded-md">
                              {sub.subjectTitle}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                isGraded
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                  : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              {sub.status}
                            </span>
                            {isPastDeadline && (
                              <span className="text-[9px] font-bold bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Late Submission
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {sub.title}
                          </h4>
                          <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              {sub.studentName || "Anonymous Student"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {getFormatTime(sub.submittedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                          <a
                            href={sub.submissionFile || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-lg hover:border-brand-royal/50 hover:text-brand-royal transition-all text-xs flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                          {!isGraded && (
                            <button
                              onClick={() => {
                                setGradingId(sub.id);
                                setGradeScore("100");
                                setGradeFeedback("");
                              }}
                              className="p-2 bg-brand-royal text-white rounded-lg hover:bg-blue-600 transition-all text-xs flex items-center gap-1 font-semibold"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Grade</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Graded Details */}
                      {isGraded && (
                        <div className="mt-3 p-3 bg-white dark:bg-slate-950/40 rounded-lg border border-slate-200 dark:border-white/5 space-y-1 text-xs">
                          <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-350">
                            <span>Score:</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{sub.grade}</span>
                          </div>
                          {sub.feedback && (
                            <div className="text-[11px] text-slate-500 italic mt-1">
                              "{sub.feedback}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Grading Sidebar Panel */}
        <div className="space-y-4">
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2">
              Grading Portal
            </h3>

            {gradingId ? (
              (() => {
                const sub = classSubmissions.find((x) => x.id === gradingId);
                return (
                  <form onSubmit={(e) => handleGradeSubmit(e, gradingId)} className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Grading For</span>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">{sub?.studentName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sub?.title}</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold block">Score (Out of 100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gradeScore}
                        onChange={(e) => setGradeScore(e.target.value)}
                        className="w-full premium-input text-xs h-10 py-2"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold block">Comments / Feedback</label>
                      <textarea
                        placeholder="Add constructive comments for the student…"
                        value={gradeFeedback}
                        onChange={(e) => setGradeFeedback(e.target.value)}
                        className="w-full premium-input text-xs h-24 resize-none py-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setGradingId(null)}
                        className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-900 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-lg bg-brand-royal text-white font-bold hover:bg-blue-600 transition-all shadow-md shadow-brand-royal/10"
                      >
                        Save Grade
                      </button>
                    </div>
                  </form>
                );
              })()
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-500 font-semibold">
                Select a submission from the list to grade it.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
