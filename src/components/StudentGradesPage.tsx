import React, { useEffect } from "react";
import { useLmsStore } from "../store/index";
import {
  FileText,
  Award,
  User,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

export const StudentGradesPage: React.FC = () => {
  const { assignments, fetchAssignments, setView } = useLmsStore();

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Filter only student's assignments that have been graded
  const gradedAssignments = assignments.filter((a) => a.status === "Graded");

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            My Grades
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View all graded assignments, score metrics, and educator feedback.
          </p>
        </div>
        
        <button
          onClick={() => setView("assignment-view")}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-brand-royal/50 hover:text-brand-royal text-slate-700 dark:text-slate-350 rounded-xl transition-all text-xs flex items-center gap-1.5 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homework Space</span>
        </button>
      </div>

      <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-500" /> Academic Performance Record ({gradedAssignments.length})
        </h3>

        {gradedAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/5 bg-slate-50/20 dark:bg-slate-950/10">
            <div className="mb-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-royal dark:text-brand-royal-300">
              <Award className="w-6 h-6" />
            </div>
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-300 tracking-wider uppercase">
              No Grades Available Yet
            </h5>
            <p className="text-[11px] text-slate-500 max-w-[240px] mt-1.5 leading-relaxed">
              Your submissions have not been graded yet. Check back here once your professors review them!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-500 uppercase tracking-wider text-left">
                  <th className="py-3.5 px-4 font-bold">Subject</th>
                  <th className="py-3.5 px-4 font-bold">Assignment</th>
                  <th className="py-3.5 px-4 font-bold">Professor</th>
                  <th className="py-3.5 px-4 font-bold">Score</th>
                  <th className="py-3.5 px-4 font-bold">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {gradedAssignments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-brand-royal/10 text-brand-royal font-bold text-[10px]">
                        {a.subjectTitle}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {a.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{a.teacherName || "Course Professor"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        {a.grade ? a.grade.replace("A (", "").replace(")", "") : "N/A"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 italic max-w-xs truncate">
                      {a.feedback ? `"${a.feedback}"` : "No comments"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
