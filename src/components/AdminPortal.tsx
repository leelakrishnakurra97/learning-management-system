import React, { useState, useEffect, useRef } from "react";
import { useLmsStore } from "../store/index";
import { authAPI } from "../services/api";
import {
  Plus,
  Settings,
  BarChart3,
  Users,
  DollarSign,
  Activity,
  Database,
  Upload,
  FileText,
  Trash2,
  Lock,
  Unlock,
  Calendar,
  BookOpen,
  ChevronDown,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  File,
  Folder,
  Video,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────
const getSubjectSolidColor = (color: string) => {
  if (color?.startsWith("bg-")) return color;
  const c = (color || "").toLowerCase();
  if (c.includes("blue") || c.includes("sky") || c.includes("indigo")) return "bg-blue-600";
  if (c.includes("violet") || c.includes("purple")) return "bg-purple-600";
  if (c.includes("emerald") || c.includes("teal")) return "bg-emerald-600";
  if (c.includes("rose") || c.includes("pink")) return "bg-rose-600";
  if (c.includes("orange") || c.includes("amber")) return "bg-orange-600";
  return "bg-brand-royal";
};

const PremiumEmptyState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[320px] rounded-2xl border-2 border-dashed border-slate-200/80 dark:border-white/5 bg-slate-50/20 dark:bg-slate-950/10">
      <div className="mb-4 flex items-center justify-center">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-royal dark:text-brand-royal-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-300 tracking-wider uppercase">{title}</h5>
      <p className="text-[11px] text-slate-500 max-w-[220px] mt-1.5 leading-relaxed">{description}</p>
    </div>
  );
};

const API = (import.meta.env.VITE_API_URL as string) || (typeof window !== "undefined" ? `${window.location.origin}/api` : "http://localhost:3000/api");
const authHeaders = () => {
  const token = localStorage.getItem("auth_token") || "";
  return { Authorization: `Bearer ${token}` };
};

// ─── types ────────────────────────────────────────────────────────────────
interface UploadSubject { id: string; name: string; }
interface UploadClass { id: string; name: string; subjects: UploadSubject[]; }
interface UploadBoard { id: string; name: string; classes: UploadClass[]; }

interface NoteRecord {
  id: string; title: string; fileUrl: string;
}
interface AssignmentRecord {
  id: string; title: string; deadline: string; fileUrl?: string; isLocked: boolean;
}

// ─── component ───────────────────────────────────────────────────────────────
export const AdminPortal: React.FC = () => {
  const { boards, addBoard, addClass, addSubject, activeView, setView, profile } = useLmsStore();

  // ── User Management State ──
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userRole, setUserRole] = useState<"STUDENT" | "TEACHER" | "ADMIN">("STUDENT");
  const [userBoardId, setUserBoardId] = useState("");
  const [userClassId, setUserClassId] = useState("");
  const [userDept, setUserDept] = useState("Operations");
  const [userBio, setUserBio] = useState("");
  const [userQualification, setUserQualification] = useState("");

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUsersError("");
    try {
      const data = await authAPI.getUsers();
      setUsersList(data);
    } catch (err: any) {
      setUsersError("Failed to fetch users from database.");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (activeView === "admin-users") {
      fetchUsers();
    }
  }, [activeView]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsersError("");
    try {
      const payload = {
        email: userEmail,
        password: userPassword,
        firstName: userFirstName,
        lastName: userLastName,
        role: userRole,
        boardId: userRole === "STUDENT" ? userBoardId : undefined,
        classId: userRole === "STUDENT" ? userClassId : undefined,
        dept: userRole === "ADMIN" ? userDept : undefined,
        bio: userRole === "TEACHER" ? userBio : undefined,
        qualification: userRole === "TEACHER" ? userQualification : undefined,
      };

      await authAPI.createUser(payload);
      setUserEmail("");
      setUserPassword("");
      setUserFirstName("");
      setUserLastName("");
      setUserBio("");
      setUserQualification("");
      fetchUsers();
    } catch (err: any) {
      setUsersError(err.message || "Failed to create user.");
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsersError("");
    try {
      const payload = {
        email: userEmail,
        password: userPassword || undefined,
        firstName: userFirstName,
        lastName: userLastName,
        role: userRole,
        boardId: userRole === "STUDENT" ? userBoardId : undefined,
        classId: userRole === "STUDENT" ? userClassId : undefined,
        dept: userRole === "ADMIN" ? userDept : undefined,
        bio: userRole === "TEACHER" ? userBio : undefined,
        qualification: userRole === "TEACHER" ? userQualification : undefined,
      };

      await authAPI.updateUser(editingUser.id, payload);
      setEditingUser(null);
      setUserEmail("");
      setUserPassword("");
      setUserFirstName("");
      setUserLastName("");
      setUserBio("");
      setUserQualification("");
      fetchUsers();
    } catch (err: any) {
      setUsersError(err.message || "Failed to update user.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setUsersError("");
    try {
      await authAPI.deleteUser(id);
      fetchUsers();
    } catch (err: any) {
      setUsersError("Failed to delete user.");
    }
  };

  // ── structure builder ──
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0]?.id || "");
  const [selectedClassId, setSelectedClassId] = useState(boards[0]?.classes[0]?.id || "");
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [newSubjectColor, setNewSubjectColor] = useState("bg-indigo-600");

  // ── upload module ──
  const [uploadBoards, setUploadBoards] = useState<UploadBoard[]>([]);
  const [upBoardId, setUpBoardId] = useState("");
  const [upClassId, setUpClassId] = useState("");
  const [upSubjectId, setUpSubjectId] = useState("");
  const [uploadTab, setUploadTab] = useState<"notes" | "assignments" | "videos">("notes");

  // notes form
  const [noteTitle, setNoteTitle] = useState("");
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const noteFileRef = useRef<HTMLInputElement>(null);

  // assignment form
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDesc, setAssignDesc] = useState("");
  const [assignDeadline, setAssignDeadline] = useState("");
  const [assignMaxMarks, setAssignMaxMarks] = useState("100");
  const [assignFile, setAssignFile] = useState<File | null>(null);
  const assignFileRef = useRef<HTMLInputElement>(null);

  // video form
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDuration, setVideoDuration] = useState("10"); // in minutes
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  // lists
  const [notes, setNotes] = useState<NoteRecord[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // deadline edit
  const [editDeadlineId, setEditDeadlineId] = useState<string | null>(null);
  const [editDeadlineVal, setEditDeadlineVal] = useState("");

  const activeBoard = boards.find((b) => b.id === selectedBoardId) || boards[0];
  const activeClass = activeBoard?.classes?.find((c) => c.id === selectedClassId) || activeBoard?.classes?.[0];

  // ── fetch upload structure ─────────────────────────────────────────────────
  useEffect(() => {
    if (activeView !== "admin-upload") return;
    fetch(`${API}/upload/structure`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => {
        if (d.boards) {
          setUploadBoards(d.boards);
          const first = d.boards[0];
          if (first) {
            setUpBoardId(first.id);
            const firstClass = first.classes?.[0];
            if (firstClass) {
              setUpClassId(firstClass.id);
              setUpSubjectId(firstClass.subjects?.[0]?.id || "");
            }
          }
        }
      })
      .catch(() => {
        // API offline – use store boards as fallback
        const mapped: UploadBoard[] = boards.map((b) => ({
          id: b.id,
          name: b.title,
          classes: b.classes.map((c) => ({
            id: c.id,
            name: c.title,
            subjects: c.subjects.map((s) => ({ id: s.id, name: s.title })),
          })),
        }));
        setUploadBoards(mapped);
        if (mapped[0]) {
          setUpBoardId(mapped[0].id);
          const fc = mapped[0].classes[0];
          if (fc) { setUpClassId(fc.id); setUpSubjectId(fc.subjects[0]?.id || ""); }
        }
      });
  }, [activeView]);

  // ── fetch notes/assignments/videos when subject changes ───────────────────
  useEffect(() => {
    if (!upSubjectId || activeView !== "admin-upload") return;
    fetch(`${API}/upload/notes?subjectId=${upSubjectId}`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => setNotes(d.notes || [])).catch(() => setNotes([]));
    fetch(`${API}/upload/assignments?subjectId=${upSubjectId}`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => setAssignments(d.assignments || [])).catch(() => setAssignments([]));
    fetch(`${API}/upload/videos?subjectId=${upSubjectId}`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => setVideos(d.videos || [])).catch(() => setVideos([]));
  }, [upSubjectId, activeView]);

  // ── helper: get class/subject name for R2 key ─────────────────────────────
  const upBoard = uploadBoards.find((b) => b.id === upBoardId);
  const upClass = upBoard?.classes?.find((c) => c.id === upClassId);
  const upSubject = upClass?.subjects?.find((s) => s.id === upSubjectId);

  // ── structure handlers ────────────────────────────────────────────────────
  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardTitle) return;
    addBoard(newBoardTitle);
    useLmsStore.getState().addNotification("Board Added", `"${newBoardTitle}" registered.`, "success");
    setNewBoardTitle("");
  };
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBoardId || !newClassTitle) return;
    addClass(selectedBoardId, newClassTitle);
    useLmsStore.getState().addNotification("Class Added", `"${newClassTitle}" added.`, "success");
    setNewClassTitle("");
  };
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBoardId || !selectedClassId || !newSubjectTitle) return;
    addSubject(selectedBoardId, selectedClassId, newSubjectTitle, newSubjectColor);
    useLmsStore.getState().addNotification("Subject Added", `"${newSubjectTitle}" created.`, "success");
    setNewSubjectTitle("");
  };

  // ── upload helpers ────────────────────────────────────────────────────────
  const showStatus = (type: "success" | "error", msg: string) => {
    setUploadStatus({ type, msg });
    setTimeout(() => setUploadStatus(null), 4000);
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteFile || !upSubjectId || !noteTitle) return showStatus("error", "Fill all fields and select a file.");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", noteFile);
    fd.append("subjectId", upSubjectId);
    fd.append("title", noteTitle);
    fd.append("classTitle", upClass?.name || "general");
    fd.append("subjectTitle", upSubject?.name || "general");
    try {
      const r = await fetch(`${API}/upload/note`, { method: "POST", headers: authHeaders(), body: fd });
      const d = await r.json();
      if (r.ok) {
        showStatus("success", "Note uploaded successfully!");
        setNotes((prev) => [d.note, ...prev]);
        setNoteTitle(""); setNoteFile(null);
        if (noteFileRef.current) noteFileRef.current.value = "";
      } else { showStatus("error", d.error || "Upload failed."); }
    } catch { showStatus("error", "Server unreachable. Check if the backend is running."); }
    setUploading(false);
  };

  const handleUploadAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upSubjectId || !assignTitle || !assignDeadline) return showStatus("error", "Fill title, subject, and deadline.");
    setUploading(true);
    const fd = new FormData();
    fd.append("subjectId", upSubjectId);
    fd.append("title", assignTitle);
    fd.append("description", assignDesc);
    fd.append("deadline", new Date(assignDeadline).toISOString());
    fd.append("maxMarks", assignMaxMarks);
    fd.append("classTitle", upClass?.name || "general");
    fd.append("subjectTitle", upSubject?.name || "general");
    if (assignFile) fd.append("file", assignFile);
    try {
      const r = await fetch(`${API}/upload/assignment`, { method: "POST", headers: authHeaders(), body: fd });
      const d = await r.json();
      if (r.ok) {
        showStatus("success", "Assignment created successfully!");
        setAssignments((prev) => [{ ...d.assignment, isLocked: false }, ...prev]);
        setAssignTitle(""); setAssignDesc(""); setAssignDeadline(""); setAssignFile(null);
        if (assignFileRef.current) assignFileRef.current.value = "";
      } else { showStatus("error", d.error || "Failed."); }
    } catch { showStatus("error", "Server unreachable."); }
    setUploading(false);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await fetch(`${API}/upload/note/${id}`, { method: "DELETE", headers: authHeaders() });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch { showStatus("error", "Delete failed."); }
  };

  const handleDeleteAssignment = async (id: string) => {
    try {
      await fetch(`${API}/upload/assignment/${id}`, { method: "DELETE", headers: authHeaders() });
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch { showStatus("error", "Delete failed."); }
  };

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !upSubjectId || !videoTitle) return showStatus("error", "Fill all fields and select a video file.");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", videoFile);
    fd.append("subjectId", upSubjectId);
    fd.append("title", videoTitle);
    fd.append("duration", videoDuration);
    fd.append("classTitle", upClass?.name || "general");
    fd.append("subjectTitle", upSubject?.name || "general");
    try {
      const r = await fetch(`${API}/upload/video`, { method: "POST", headers: authHeaders(), body: fd });
      const d = await r.json();
      if (r.ok) {
        showStatus("success", "Video lecture uploaded successfully!");
        setVideos((prev) => [d.video, ...prev]);
        setVideoTitle(""); setVideoDuration("10"); setVideoFile(null);
        if (videoFileRef.current) videoFileRef.current.value = "";
      } else { showStatus("error", d.error || "Upload failed."); }
    } catch { showStatus("error", "Server unreachable."); }
    setUploading(false);
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await fetch(`${API}/upload/video/${id}`, { method: "DELETE", headers: authHeaders() });
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch { showStatus("error", "Delete failed."); }
  };

  const handleUpdateDeadline = async (id: string) => {
    if (!editDeadlineVal) return;
    try {
      const r = await fetch(`${API}/upload/assignment/${id}/deadline`, {
        method: "PATCH", headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ deadline: new Date(editDeadlineVal).toISOString() }),
      });
      const d = await r.json();
      if (r.ok) {
        setAssignments((prev) => prev.map((a) => a.id === id ? { ...a, deadline: editDeadlineVal, isLocked: d.isLocked } : a));
        setEditDeadlineId(null);
        showStatus("success", "Deadline updated.");
      }
    } catch { showStatus("error", "Update failed."); }
  };

  const colors = [
    { value: "bg-indigo-600", label: "Indigo Space" },
    { value: "bg-violet-600", label: "Violet Glow" },
    { value: "bg-sky-600", label: "Royal Sky" },
    { value: "bg-emerald-600", label: "Emerald Deep" },
    { value: "bg-rose-600", label: "Rose Gold" },
  ];

  const views = React.useMemo(() => {
    const allViews = [
      { key: "admin-upload", label: "Contents and assignments", icon: Upload },
      { key: "admin-analytics", label: "Platform Analytics", icon: BarChart3 },
      { key: "admin-users", label: "User Management", icon: Users },
    ] as const;
    if (profile?.role === "teacher") {
      return allViews.filter((v) => v.key === "admin-upload");
    }
    return allViews.filter((v) => v.key !== "admin-upload");
  }, [profile?.role]);

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Tab Bar */}
      <div className="flex border-b border-slate-200 dark:border-white/5 gap-4 overflow-x-auto">
        {views.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key as any)}
            className={`pb-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-all ${
              activeView === key
                ? "border-brand-royal text-brand-royal dark:text-white"
                : "border-transparent text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── STRUCTURE BUILDER ─────────────────────────────────────────────── */}
      {activeView === "admin-structure" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Board Creator */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2">1. Board Standards</h4>
            <form onSubmit={handleAddBoard} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Board Title</label>
                <input type="text" placeholder="e.g. ICSE Board" value={newBoardTitle} onChange={(e) => setNewBoardTitle(e.target.value)} className="premium-input text-xs" required />
              </div>
              <button type="submit" className="w-full premium-btn-primary py-2 text-xs"><Plus className="w-3.5 h-3.5" /><span>Registry Board</span></button>
            </form>
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Board List</span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {boards.map((b) => (
                  <button key={b.id} onClick={() => { setSelectedBoardId(b.id); setSelectedClassId(b.classes[0]?.id || ""); }}
                    className={`w-full py-2 px-3 rounded-lg text-left text-xs transition-all border flex items-center justify-between ${selectedBoardId === b.id ? "border-brand-royal bg-brand-royal/10 text-brand-royal dark:text-white font-semibold" : "border-transparent text-slate-700 hover:text-slate-900 bg-slate-50 dark:text-slate-400 dark:bg-slate-900/60"}`}>
                    <span>{b.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Class Creator */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2">2. Class Grade Levels</h4>
            <form onSubmit={handleAddClass} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Active Board</label>
                <div className="text-xs text-slate-800 bg-slate-100 p-2.5 rounded-lg border border-slate-300 font-semibold dark:text-slate-300 dark:bg-slate-950 dark:border-white/5">{activeBoard?.title || "None"}</div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Class Title</label>
                <input type="text" placeholder="e.g. Class 11" value={newClassTitle} onChange={(e) => setNewClassTitle(e.target.value)} className="premium-input text-xs" required />
              </div>
              <button type="submit" disabled={!selectedBoardId} className="w-full premium-btn-primary py-2 text-xs disabled:opacity-50"><Plus className="w-3.5 h-3.5" /><span>Add Class Grade</span></button>
            </form>
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Class List</span>
              {activeBoard?.classes.length === 0 ? <p className="text-xs text-slate-600 dark:text-slate-500 text-center py-4">No classes.</p> : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeBoard?.classes.map((c) => (
                    <button key={c.id} onClick={() => setSelectedClassId(c.id)}
                      className={`w-full py-2 px-3 rounded-lg text-left text-xs transition-all border flex items-center justify-between ${selectedClassId === c.id ? "border-brand-royal bg-brand-royal/10 text-brand-royal font-semibold" : "border-transparent text-slate-700 bg-slate-50 dark:text-slate-400 dark:bg-slate-900/60"}`}>
                      <span>{c.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject Creator */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2">3. Dynamic Subjects</h4>
            <form onSubmit={handleAddSubject} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Context</label>
                <div className="text-[10px] text-slate-800 bg-slate-100 p-2.5 rounded-lg border border-slate-300 font-mono dark:text-slate-300 dark:bg-slate-950 dark:border-white/5">{activeBoard?.title} &gt; {activeClass?.title || "None"}</div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Subject Title</label>
                <input type="text" placeholder="e.g. Biology Elective" value={newSubjectTitle} onChange={(e) => setNewSubjectTitle(e.target.value)} className="premium-input text-xs" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Visual Accent</label>
                <select value={newSubjectColor} onChange={(e) => setNewSubjectColor(e.target.value)} className="premium-input text-xs">
                  {colors.map((c, i) => (<option key={i} value={c.value}>{c.label}</option>))}
                </select>
              </div>
              <button type="submit" disabled={!selectedClassId} className="w-full premium-btn-primary py-2 text-xs disabled:opacity-50"><Plus className="w-3.5 h-3.5" /><span>Create Subject</span></button>
            </form>
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Subjects</span>
              {!activeClass || activeClass.subjects.length === 0 ? <p className="text-xs text-slate-600 text-center py-4">None registered.</p> : (
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {activeClass.subjects.map((sub) => (
                    <div key={sub.id} className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs flex justify-between items-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                      <span>{sub.title}</span>
                      <span className={`w-3.5 h-3.5 rounded ${getSubjectSolidColor(sub.color)}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT UPLOAD MODULE ─────────────────────────────────────────── */}
      {activeView === "admin-upload" && (
        <div className="space-y-6 animate-fade-in-up">

          {/* Status Toast */}
          {uploadStatus && (
            <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border ${uploadStatus.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"}`}>
              {uploadStatus.type === "success" ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              {uploadStatus.msg}
            </div>
          )}

          {/* Class / Subject Picker */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Folder className="w-4 h-4 text-brand-royal" /> Select Class &amp; Subject
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Board */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Board</label>
                <div className="relative">
                  <select value={upBoardId} onChange={(e) => {
                    setUpBoardId(e.target.value);
                    const b = uploadBoards.find((x) => x.id === e.target.value);
                    const fc = b?.classes[0]; setUpClassId(fc?.id || ""); setUpSubjectId(fc?.subjects[0]?.id || "");
                  }} className="w-full premium-input text-xs appearance-none pr-8">
                    {uploadBoards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {/* Class */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Class</label>
                <div className="relative">
                  <select value={upClassId} onChange={(e) => {
                    setUpClassId(e.target.value);
                    const cls = upBoard?.classes.find((c) => c.id === e.target.value);
                    setUpSubjectId(cls?.subjects[0]?.id || "");
                  }} className="w-full premium-input text-xs appearance-none pr-8">
                    {(uploadBoards.find((b) => b.id === upBoardId)?.classes || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {/* Subject */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Subject</label>
                <div className="relative">
                  <select value={upSubjectId} onChange={(e) => setUpSubjectId(e.target.value)} className="w-full premium-input text-xs appearance-none pr-8">
                    {(upClass?.subjects || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Notes / Assignments / Videos tabs */}
          <div className="flex gap-3">
            <button onClick={() => setUploadTab("notes")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${uploadTab === "notes" ? "bg-brand-royal text-white border-brand-royal shadow-md" : "bg-white dark:bg-slate-950 text-slate-600 border-slate-300 dark:border-white/10 hover:border-brand-royal/40"}`}>
              <BookOpen className="w-3.5 h-3.5" /> Notes &amp; PDFs
            </button>
            <button onClick={() => setUploadTab("assignments")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${uploadTab === "assignments" ? "bg-brand-royal text-white border-brand-royal shadow-md" : "bg-white dark:bg-slate-950 text-slate-600 border-slate-300 dark:border-white/10 hover:border-brand-royal/40"}`}>
              <FileText className="w-3.5 h-3.5" /> Assignments
            </button>
            {profile?.role !== "teacher" && (
              <button onClick={() => setUploadTab("videos")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${uploadTab === "videos" ? "bg-brand-royal text-white border-brand-royal shadow-md" : "bg-white dark:bg-slate-950 text-slate-600 border-slate-300 dark:border-white/10 hover:border-brand-royal/40"}`}>
                <Video className="w-3.5 h-3.5" /> Video Lectures
              </button>
            )}
          </div>

          {/* ── Notes Tab ──────────────────────────────────────────────────── */}
          {uploadTab === "notes" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Form */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Upload className="w-4 h-4 text-brand-royal" /> Upload Note / PDF
                </h4>
                <form onSubmit={handleUploadNote} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Note Title</label>
                    <input type="text" placeholder="Enter the note title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} className="premium-input text-xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">PDF</label>
                    <div
                      onClick={() => noteFileRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-brand-royal/50 transition-colors group">
                      <File className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2 group-hover:text-brand-royal/50 transition-colors" />
                      {noteFile ? (
                        <p className="text-xs font-semibold text-brand-royal">{noteFile.name}</p>
                      ) : (
                        <p className="text-xs text-slate-500">Click to select PDF</p>
                      )}
                      <input ref={noteFileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          if (!file.name.toLowerCase().endsWith('.pdf')) {
                            showStatus("error", "Only PDF files are allowed.");
                            e.target.value = "";
                            setNoteFile(null);
                          } else if (file.size > 5 * 1024 * 1024) {
                            showStatus("error", "File size exceeds 5MB limit. Please upload a smaller file.");
                            e.target.value = "";
                            setNoteFile(null);
                          } else {
                            setNoteFile(file);
                          }
                        }
                      }} />
                    </div>
                  </div>
                  <button type="submit" disabled={uploading || !noteFile || !noteTitle || !upSubjectId}
                    className="w-full premium-btn-primary py-2.5 text-xs disabled:opacity-50">
                    {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{uploading ? "Uploading…" : "Upload"}</span>
                  </button>
                </form>
              </div>

              {/* Notes List */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" /> Uploaded Notes ({notes.length})
                </h4>
                {notes.length === 0 ? (
                  <PremiumEmptyState
                    icon={BookOpen}
                    title="No notes uploaded"
                    description="Upload PDFs, reference materials, or lesson notes to get started."
                  />
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notes.map((n) => (
                      <div key={n.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                          <File className="w-4 h-4 text-brand-royal flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">{n.title}</p>
                            <a href={n.fileUrl} target="_blank" rel="noreferrer" className="text-[10px] text-brand-violet hover:underline truncate block">{n.fileUrl.split("/").pop()}</a>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteNote(n.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Assignments Tab ────────────────────────────────────────────── */}
          {uploadTab === "assignments" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Assignment */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-royal" /> Create Assignment
                </h4>
                <form onSubmit={handleUploadAssignment} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Title</label>
                    <input type="text" placeholder="Assignment title" value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)} className="premium-input text-xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Description</label>
                    <textarea placeholder="Instructions for students…" value={assignDesc} onChange={(e) => setAssignDesc(e.target.value)} className="premium-input text-xs h-20 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase flex items-center gap-1 h-4"><Calendar className="w-3 h-3" /> Deadline</label>
                      <input type="datetime-local" value={assignDeadline} onChange={(e) => setAssignDeadline(e.target.value)} className="premium-input text-xs h-11 py-2" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase flex items-center h-4">Max Marks</label>
                      <input type="number" min="1" value={assignMaxMarks} onChange={(e) => setAssignMaxMarks(e.target.value)} className="premium-input text-xs h-11 py-2" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Attachment (optional)</label>
                    <div onClick={() => assignFileRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-brand-royal/50 transition-colors">
                      {assignFile ? <p className="text-xs font-semibold text-brand-royal">{assignFile.name}</p> : <p className="text-xs text-slate-500">Click to attach a file</p>}
                      <input ref={assignFileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.zip" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          showStatus("error", "File size exceeds 5MB limit. Please upload a smaller file.");
                          e.target.value = "";
                          setAssignFile(null);
                        } else {
                          setAssignFile(file);
                        }
                      }} />
                    </div>
                  </div>
                  <button type="submit" disabled={uploading || !assignTitle || !assignDeadline || !upSubjectId} className="w-full premium-btn-primary py-2.5 text-xs disabled:opacity-50">
                    {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span>{uploading ? "Creating…" : "Publish Assignment"}</span>
                  </button>
                </form>
              </div>

              {/* Assignments List */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" /> Assignments ({assignments.length})
                </h4>
                {assignments.length === 0 ? (
                  <PremiumEmptyState
                    icon={FileText}
                    title="No assignments"
                    description="Publish problems, tasks, or evaluations for students to submit."
                  />
                ) : (
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {assignments.map((a) => {
                      const isLocked = a.isLocked || new Date(a.deadline) < new Date();
                      return (
                        <div key={a.id} className={`p-4 rounded-xl border transition-all ${isLocked ? "bg-red-50/50 dark:bg-red-900/10 border-red-300/40 dark:border-red-500/20" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/5"}`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {isLocked
                                  ? <span className="flex items-center gap-1 text-[9px] font-bold bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-300/50 px-2 py-0.5 rounded-full"><Lock className="w-2.5 h-2.5" /> Locked</span>
                                  : <span className="flex items-center gap-1 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-300/50 px-2 py-0.5 rounded-full"><Unlock className="w-2.5 h-2.5" /> Open</span>
                                }
                              </div>
                              <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{a.title}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Deadline: {new Date(a.deadline).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                              </p>
                            </div>
                            <button onClick={() => handleDeleteAssignment(a.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Deadline edit */}
                          {editDeadlineId === a.id ? (
                            <div className="flex gap-2 mt-2">
                              <input type="datetime-local" value={editDeadlineVal} onChange={(e) => setEditDeadlineVal(e.target.value)} className="premium-input text-[11px] py-1.5 flex-1" />
                              <button onClick={() => handleUpdateDeadline(a.id)} className="px-3 py-1.5 bg-brand-royal text-white text-[10px] font-bold rounded-lg hover:bg-brand-royal/90 transition-colors">Save</button>
                              <button onClick={() => setEditDeadlineId(null)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg">Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => { setEditDeadlineId(a.id); setEditDeadlineVal(a.deadline ? a.deadline.slice(0, 16) : ""); }}
                              className="mt-2 text-[10px] text-brand-violet hover:underline font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Edit Deadline / {isLocked ? "Unlock" : "Lock"}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Videos Tab — hidden for teachers ─────────────────────────── */}
          {uploadTab === "videos" && profile?.role !== "teacher" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Video Form */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Upload className="w-4 h-4 text-brand-royal" /> Upload Video Lecture
                </h4>
                <form onSubmit={handleUploadVideo} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Video Title</label>
                    <input type="text" placeholder="e.g. Introduction to Calculus" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="premium-input text-xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Duration (Minutes)</label>
                    <input type="number" min="1" placeholder="e.g. 20" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="premium-input text-xs" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Video File</label>
                    <div
                      onClick={() => videoFileRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-brand-royal/50 transition-colors group">
                      <Video className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2 group-hover:text-brand-royal/50 transition-colors" />
                      {videoFile ? (
                        <p className="text-xs font-semibold text-brand-royal">{videoFile.name}</p>
                      ) : (
                        <p className="text-xs text-slate-500">Click to select MP4, WebM, or MOV video</p>
                      )}
                      <input ref={videoFileRef} type="file" accept="video/mp4,video/webm,video/quicktime,video/x-matroska" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          showStatus("error", "File size exceeds 5MB limit. Please upload a smaller file.");
                          e.target.value = "";
                          setVideoFile(null);
                        } else {
                          setVideoFile(file);
                        }
                      }} />
                    </div>
                  </div>
                  <button type="submit" disabled={uploading || !videoFile || !videoTitle || !upSubjectId}
                    className="w-full premium-btn-primary py-2.5 text-xs disabled:opacity-50">
                    {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{uploading ? "Uploading Video…" : "Upload Video"}</span>
                  </button>
                </form>
              </div>

              {/* Videos List */}
              <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-500" /> Uploaded Video Lectures ({videos.length})
                </h4>
                {videos.length === 0 ? (
                  <PremiumEmptyState
                    icon={Video}
                    title="No video lectures"
                    description="Upload video classes, recording playbacks, or screen captures."
                  />
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {videos.map((v) => (
                      <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                          <Video className="w-4 h-4 text-brand-royal flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">{v.title}</p>
                            <span className="text-[10px] text-slate-500 block">Duration: {Math.round(v.duration / 60)} mins</span>
                            <a href={v.videoUrl} target="_blank" rel="noreferrer" className="text-[10px] text-brand-violet hover:underline truncate block">{v.videoUrl.split("/").pop()}</a>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteVideo(v.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ANALYTICS DASHBOARD ───────────────────────────────────────────── */}
      {activeView === "admin-analytics" && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Subscriptions", value: "1,500 Scholars", icon: Users, color: "text-blue-500" },
              { label: "Total Platform Revenue", value: "₹4.50 Crores", icon: DollarSign, color: "text-emerald-500" },
              { label: "Server Uptime", value: "99.98%", icon: Activity, color: "text-violet-500" },
              { label: "Database Queries", value: "145k", icon: Database, color: "text-indigo-500" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card p-5 border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">{stat.label}</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">{stat.value}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Monthly Active Registrations</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-500">Platform subscription scaling after Class 10/12 exam launches.</p>
                </div>
                <div className="text-[10px] font-bold text-brand-violet dark:text-brand-violet-light bg-violet-500/10 px-2 py-0.5 rounded border border-brand-violet/20">+12.4% QoQ Growth</div>
              </div>
              <div className="h-44 w-full flex items-end pt-4 border-b border-slate-200 dark:border-white/5 relative">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
                  <path d="M0,150 Q50,120 100,110 T200,60 T300,50 T400,10" fill="none" stroke="url(#grad)" strokeWidth="3.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="w-full flex justify-between text-[9px] text-slate-600 dark:text-slate-500 font-bold px-1 mb-[-20px] relative z-10">
                  {["Jan","Feb","Mar","Apr","May","Jun"].map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>

            <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2">Regional Distribution</h4>
              <div className="space-y-3">
                {[{ city: "Mumbai Metro", share: "34%", students: "510" }, { city: "NCR Delhi", share: "28%", students: "420" }, { city: "Bengaluru", share: "18%", students: "270" }, { city: "Hyderabad", share: "12%", students: "180" }, { city: "Pune", share: "8%", students: "120" }].map((r, i) => (
                  <div key={i} className="space-y-1 text-xs">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{r.city}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{r.share}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-violet" style={{ width: r.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── USER MANAGEMENT ────────────────────────────────────────────────── */}
      {activeView === "admin-users" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Left Column: Create or Edit User Form */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4 h-fit">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-2 flex items-center justify-between">
              <span>{editingUser ? "Edit Scholar/Instructor" : "Register Scholar/Instructor"}</span>
              {editingUser && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setUserEmail("");
                    setUserPassword("");
                    setUserFirstName("");
                    setUserLastName("");
                    setUserBio("");
                    setUserQualification("");
                  }}
                  className="text-[10px] text-slate-500 hover:text-red-500 font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </h4>

            {usersError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg text-center">
                {usersError}
              </div>
            )}

            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                    className="premium-input text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                    className="premium-input text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Academic Email</label>
                <input
                  type="email"
                  placeholder="e.g. aarav@nexoralearning.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="premium-input text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">
                  {editingUser ? "Password (leave blank to keep unchanged)" : "Password"}
                </label>
                <input
                  type="password"
                  placeholder="e.g. password123"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="premium-input text-xs"
                  required={!editingUser}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase">Academic Role</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="premium-input text-xs bg-white dark:bg-slate-950"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="TEACHER">TEACHER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              {/* STUDENT SPECIFIC FIELDS */}
              {userRole === "STUDENT" && (
                <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-white/5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Opted Board</label>
                    <select
                      value={userBoardId}
                      onChange={(e) => {
                        setUserBoardId(e.target.value);
                        const matched = boards.find((b) => b.id === e.target.value);
                        setUserClassId(matched?.classes[0]?.id || "");
                      }}
                      className="premium-input text-[11px] bg-white dark:bg-slate-950"
                      required
                    >
                      <option value="">-- Select Board --</option>
                      {boards.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Class Grade</label>
                    <select
                      value={userClassId}
                      onChange={(e) => setUserClassId(e.target.value)}
                      className="premium-input text-[11px] bg-white dark:bg-slate-950"
                      required
                    >
                      <option value="">-- Select Class --</option>
                      {boards
                        .find((b) => b.id === userBoardId)
                        ?.classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}

              {/* TEACHER SPECIFIC FIELDS */}
              {userRole === "TEACHER" && (
                <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-white/5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. M.Sc. in Mathematics"
                      value={userQualification}
                      onChange={(e) => setUserQualification(e.target.value)}
                      className="premium-input text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Instructor Bio</label>
                    <textarea
                      placeholder="e.g. Expert in Algebra and Geometry..."
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      className="premium-input text-xs h-16"
                    />
                  </div>
                </div>
              )}

              {/* ADMIN SPECIFIC FIELDS */}
              {userRole === "ADMIN" && (
                <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-white/5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-600 dark:text-slate-500 uppercase">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. Curriculum Operations"
                      value={userDept}
                      onChange={(e) => setUserDept(e.target.value)}
                      className="premium-input text-xs"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full premium-btn-primary py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{editingUser ? "Save User Changes" : "Create User Account"}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Database Users List */}
          <div className="lg:col-span-2 glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-royal" />
                <span>Active Database Logins ({usersList.length})</span>
              </h4>
              <button
                type="button"
                onClick={fetchUsers}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-500"
                title="Refresh user list"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? "animate-spin" : ""}`} />
              </button>
            </div>

            {loadingUsers && usersList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <RefreshCw className="w-8 h-8 animate-spin mb-3 text-slate-350" />
                <p className="text-xs">Connecting to Database Console...</p>
              </div>
            ) : usersList.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Users className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-750" />
                <p className="text-xs font-semibold">No registered users in PostgreSQL database.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
                {usersList.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl hover:border-slate-300 dark:hover:border-white/10 transition-all"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                          user.role === "ADMIN"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : user.role === "TEACHER"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block font-mono truncate">{user.email}</span>
                      
                      {/* Sub-profile Context Details */}
                      {user.role === "STUDENT" && user.studentProfile && (
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Board: {user.studentProfile.board?.name || "TNSB"} | Grade: {user.studentProfile.class?.name || "Class 12"}
                        </span>
                      )}
                      {user.role === "TEACHER" && user.teacherProfile && (
                        <span className="text-[10px] text-slate-400 block truncate">
                          Qualification: {user.teacherProfile.qualification}
                        </span>
                      )}
                      {user.role === "ADMIN" && user.adminProfile && (
                        <span className="text-[10px] text-slate-400 block">
                          Dept: {user.adminProfile.dept}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUser(user);
                          setUserEmail(user.email);
                          setUserPassword(""); // password input remains blank unless editing
                          setUserFirstName(user.firstName);
                          setUserLastName(user.lastName);
                          setUserRole(user.role);
                          if (user.role === "STUDENT" && user.studentProfile) {
                            setUserBoardId(user.studentProfile.boardId);
                            setUserClassId(user.studentProfile.classId);
                          } else if (user.role === "TEACHER" && user.teacherProfile) {
                            setUserBio(user.teacherProfile.bio || "");
                            setUserQualification(user.teacherProfile.qualification || "");
                          } else if (user.role === "ADMIN" && user.adminProfile) {
                            setUserDept(user.adminProfile.dept || "");
                          }
                        }}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:text-brand-royal dark:hover:text-white hover:border-brand-royal/50 transition-colors"
                      >
                        Edit
                      </button>
                      
                      {/* Prevent self-deletion */}
                      {user.email !== profile?.email && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
