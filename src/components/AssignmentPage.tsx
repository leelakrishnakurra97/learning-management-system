import React, { useState } from "react";
import { useLmsStore } from "../store/index";
import {
  FileText,
  Calendar,
  Upload,
  Check,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  CornerDownRight,
} from "lucide-react";

export const AssignmentPage: React.FC = () => {
  const { profile, boards, assignments, submitAssignment, setView } =
    useLmsStore();
  const activeBoard =
    boards.find((b) => b.id === profile.selectedBoardId) || boards[0];

  const activeClass =
    activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) ||
    activeBoard?.classes?.[0];

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  const classSubjectIds = activeClass?.subjects?.map((s) => s.id) || [];
  const classAssignments = assignments.filter((a) =>
    classSubjectIds.includes(a.subjectId),
  );

  const [selectedAssignId, setSelectedAssignId] = useState(
    classAssignments[0]?.id || "",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync selectedAssignId when registered profile class changes
  React.useEffect(() => {
    if (classAssignments.length > 0) {
      if (!classAssignments.some((a) => a.id === selectedAssignId)) {
        setSelectedAssignId(classAssignments[0].id);
      }
    } else {
      setSelectedAssignId("");
    }
  }, [profile.selectedClassId, classAssignments]);

  const activeAssign =
    classAssignments.find((a) => a.id === selectedAssignId) ||
    classAssignments[0];
  const isChemistry =
    activeAssign?.subjectTitle?.toLowerCase().includes("chemistry") ||
    activeAssign?.subjectId?.toLowerCase().includes("chem");
  const subjectTagColor = isChemistry
    ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
    : "text-sky-600 dark:text-sky-400 font-extrabold";
  const subjectIconColor = isChemistry
    ? "text-emerald-500 dark:text-emerald-400"
    : "text-sky-500 dark:text-sky-400";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeAssign || activeAssign.status !== "Pending") return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit. Please upload a smaller file.");
      setUploadedFileName("");
      setSelectedFile(null);
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);
    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !activeAssign) return;

    setIsUploading(true);
    setUploadError("");
    submitAssignment(activeAssign.id, selectedFile)
      .then(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        setSelectedFile(null);
        setUploadedFileName("");
        
        // Trigger toast notification
        useLmsStore
          .getState()
          .addNotification(
            "Assignment Submitted",
            `"${activeAssign.title}" has been uploaded successfully for educator review.`,
            "success",
          );
      })
      .catch((err: any) => {
        setIsUploading(false);
        setUploadError(err.message || "Failed to submit assignment.");
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Left Column: Assignment Selector & Detailed Panel */}
      <div className="lg:col-span-2 space-y-6">
        {activeAssign ? (
          <div className="glass-card p-6 border-slate-200 dark:border-white/5 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-5">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${subjectTagColor}`}
                >
                  {activeAssign.subjectTitle} Homework Sheet
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {activeAssign.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    activeAssign.status === "Graded"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : activeAssign.status === "Submitted"
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-605 dark:text-amber-400"
                  }`}
                >
                  Status: {activeAssign.status}
                </span>
              </div>
            </div>

            {/* Points & Deadline */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center gap-2.5">
                <Calendar className={`w-5 h-5 ${subjectIconColor}`} />
                <div>
                  <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase">
                    Due Date
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">
                    {activeAssign.deadline}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center gap-2.5">
                <FileText className={`w-5 h-5 ${subjectIconColor}`} />
                <div>
                  <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase">
                    Total Points
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">
                    {activeAssign.points} Points Max
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 text-slate-700 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Instructions
              </h4>
              <p>{activeAssign.description}</p>
            </div>

            {/* Submit Action or Submission Status */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/5">
              {activeAssign.status === "Pending" ? (
                activeAssign.rawDeadline && new Date() > new Date(activeAssign.rawDeadline) ? (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold text-center w-full flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>The deadline for this assignment has passed. Submissions are closed.</span>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                      File Submission
                    </h4>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.webp"
                    />

                    {/* Upload Box */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-brand-royal/40 rounded-none p-6 text-center cursor-pointer transition-all bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-950 flex flex-col items-center justify-center min-h-[160px]"
                    >
                      {isUploading ? (
                        <div className="space-y-2">
                          <div className="w-8 h-8 rounded-full border-2 border-brand-royal border-t-transparent animate-spin mx-auto" />
                          <span className="text-xs text-slate-700 dark:text-slate-400 block font-semibold">
                            Uploading document...
                          </span>
                        </div>
                      ) : uploadError ? (
                        <div className="space-y-2 text-red-500">
                          <AlertCircle className="w-8 h-8 mx-auto" />
                          <span className="text-xs font-bold block">
                            {uploadError}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Click to select a different file.
                          </span>
                        </div>
                      ) : uploadedFileName ? (
                        <div className="space-y-2 text-emerald-600 dark:text-emerald-400">
                          <Check className="w-8 h-8 mx-auto" />
                          <span className="text-xs font-bold block">
                            {uploadedFileName} selected
                          </span>
                          <span className="text-[10px] text-slate-605 dark:text-slate-500 block">
                            Click Submit Assignment below to finalize.
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 text-slate-600 dark:text-slate-500">
                          <Upload className="w-8 h-8 mx-auto text-brand-violet dark:text-brand-violet-light" />
                          <span className="text-xs text-slate-800 dark:text-slate-300 font-bold block">
                            Select or Drop files here
                          </span>
                          <span className="text-[10px] block">
                            PDF, DOC, DOCX, ZIP, Images supported (Max 5MB)
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!uploadedFileName || isUploading}
                      className="w-full premium-btn-primary py-3.5 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Submit Assignment for Grading</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </form>
                )
              ) : (
                <div className="p-4 rounded-none bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 space-y-2 text-xs">
                  <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase block">
                    File Submitted:
                  </span>
                  <div className="flex items-center gap-2 text-brand-royal dark:text-brand-royal-300">
                    <FileText className="w-4 h-4" />
                    <span className="font-mono font-medium">
                      {activeAssign.submissionFile}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-500">
                    Submitted on {new Date().toLocaleDateString("en-IN")}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 text-center border-slate-200 dark:border-white/5 font-sans min-h-[300px] flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-4" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              No Homework Sheet Selected
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select an assignment from the log on the right to view
              instructions and grades.
            </p>
          </div>
        )}

        {/* Educator Feedback Panel (Visible when graded) */}
        {activeAssign?.status === "Graded" && (
          <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5 text-left space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Check className="w-4.5 h-4.5" />
              <span>Educator Grade & Feedback</span>
            </div>

            <div className="p-4 rounded-none bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-2">
                <span className="text-xs text-slate-700 dark:text-slate-400">
                  Score Awarded:
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {activeAssign.grade}
                </span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-800 dark:text-slate-300">
                <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase block">
                  Teacher Comments:
                </span>
                <p className="italic">"{activeAssign.feedback}"</p>
              </div>
            </div>

            <button
              onClick={() => setView("given-grades")}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
            >
              <span>View given grades</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Homework List */}
      <div className="space-y-6">
        {/* List Selector Card */}
        <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3">
            <FileText className="w-4 h-4 text-brand-royal" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest text-left">
              Homework Log
            </h3>
          </div>

          <div className="space-y-2.5">
            {classAssignments.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-500 font-semibold">
                No homework logs available for {activeClass?.title || "selected class"}
              </div>
            ) : (
              classAssignments.map((a) => {
                const isSelected = selectedAssignId === a.id;
                const isChem = a.subjectId.includes("chem");
                const subjectTextColor = isChem
                  ? "text-fuchsia-600 dark:text-fuchsia-400 font-extrabold"
                  : "text-sky-600 dark:text-sky-400 font-extrabold";

                return (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => {
                      setSelectedAssignId(a.id);
                      setUploadSuccess(false);
                      setUploadedFileName("");
                    }}
                    className={`w-full p-3.5 rounded-none text-left border transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? "border-brand-royal bg-brand-royal/10"
                        : "border-slate-300 dark:border-white/5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full gap-2">
                      <span
                        className={`text-xs font-bold truncate max-w-[150px] ${isSelected ? "text-brand-royal dark:text-white" : "text-slate-800 dark:text-slate-300"}`}
                      >
                        {a.title}
                      </span>
                      <span
                        className={`text-[8px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          a.status === "Graded"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : a.status === "Submitted"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-605 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-500 font-semibold w-full">
                      <span className={subjectTextColor}>{a.subjectTitle}</span>
                      <span>Due: {a.deadline}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
