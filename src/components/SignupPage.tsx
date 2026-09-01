import React, { useState, useEffect, useRef } from "react";
import { useLmsStore } from "../store/index";
import {
  User,
  GraduationCap,
  ChevronRight,
  Mail,
  BookOpen,
  Check,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Shield,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { saveRegisteredStudent, getRegisteredStudents } from "../utils/localStorage";
import { authAPI } from "../services/api";
import { PlanetLogo } from "./PlanetLogo";

const locationSuggestions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const SignupPage: React.FC = () => {
  const { setView, boards } = useLmsStore();
  const [role, setRole] = useState<"student" | "teacher">("student");

  // Fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  // Academic States
  const [boardId, setBoardId] = useState("tnsb");
  const [classId, setClassId] = useState("class-12");
  const [optedSubjectId, setOptedSubjectId] = useState("maths-12-v1");
  // Validation & Loading States
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Suggestions state
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Credentials Modal State
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [registeredCredentials, setRegisteredCredentials] = useState<{
    email: string;
    password: string;
    role: string;
    profile: any;
    token: string | null;
  } | null>(null);

  // Sync state with first loaded database board/class
  useEffect(() => {
    if (boards.length > 0) {
      const existsBoard = boards.some((b) => b.id === boardId);
      if (!existsBoard) {
        const defaultBoard = boards[0];
        setBoardId(defaultBoard.id);
        if (defaultBoard.classes.length > 0) {
          setClassId(defaultBoard.classes[0].id);
        }
      }
    }
  }, [boards, boardId]);

  // Reset optedSubjectId when Board/Class/Subjects list changes
  useEffect(() => {
    const activeBoard = boards.find((b) => b.id === boardId) || boards[0];
    const activeClass =
      activeBoard?.classes?.find((c) => c.id === classId) ||
      activeBoard?.classes?.[0];
    const subjects = activeClass?.subjects || [];

    if (subjects.length > 0) {
      if (!subjects.some((s) => s.id === optedSubjectId)) {
        setOptedSubjectId(subjects[0].id);
      }
    } else {
      setOptedSubjectId("");
    }
  }, [boardId, classId, boards, optedSubjectId]);

  // Handle outside clicks for location suggestions list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeBoard = boards.find((b) => b.id === boardId) || boards[0];
  const activeClass =
    activeBoard?.classes?.find((c) => c.id === classId) || activeBoard?.classes?.[0];

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }
  const subjects = activeClass?.subjects || [];

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    if (value.trim().length > 0) {
      const matched = locationSuggestions.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(matched);
      setShowLocationSuggestions(matched.length > 0);
    } else {
      setFilteredLocations([]);
      setShowLocationSuggestions(false);
    }
  };

  const validateForm = async (): Promise<boolean> => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setAgeError("");
    setError("");

    // 1. Name validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError("Full name is required.");
      isValid = false;
    } else if (trimmedName.length < 3) {
      setNameError("Name must be at least 3 characters.");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      setNameError("Name must contain only letters and spaces.");
      isValid = false;
    }

    // 2. Gmail validation
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setEmailError("Gmail address is required.");
      isValid = false;
    } else if (!trimmedEmail.endsWith("@gmail.com")) {
      setEmailError("Please enter a valid Gmail address (ending in @gmail.com).");
      isValid = false;
    } else {
      // Check duplicate locally and online
      const students = getRegisteredStudents();
      const localExists = students.some((s) => s.email?.toLowerCase() === trimmedEmail);
      
      let dbExists = false;
      try {
        const checkRes = await authAPI.checkEmail(trimmedEmail);
        dbExists = checkRes.exists;
      } catch (err) {
        console.warn("Server duplicate email check failed. Falling back to local verification only.", err);
      }

      if (localExists || dbExists) {
        setEmailError("This Gmail address is already registered.");
        isValid = false;
      }
    }

    // 3. Age bounds validation
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      setAgeError("Please enter a valid positive age.");
      isValid = false;
    } else if (role === "student") {
      if (classId === "class-9" && (ageNum < 13 || ageNum > 16)) {
        setAgeError("Expected age for Class 9 is 13-16 years.");
        isValid = false;
      } else if (classId === "class-10" && (ageNum < 14 || ageNum > 17)) {
        setAgeError("Expected age for Class 10 is 14-17 years.");
        isValid = false;
      } else if (classId === "class-11" && (ageNum < 15 || ageNum > 18)) {
        setAgeError("Expected age for Class 11 is 15-18 years.");
        isValid = false;
      } else if (classId === "class-12" && (ageNum < 16 || ageNum > 20)) {
        setAgeError("Expected age for Class 12 is 16-20 years.");
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    setLoading(true);

    try {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "Scholar";
      const lastName = nameParts.slice(1).join(" ") || "Student";

      let serverResult = null;
      try {
        serverResult = await authAPI.signup(
          email.trim().toLowerCase(),
          "",
          firstName,
          lastName,
          role,
          boardId,
          classId
        );
      } catch (signupErr) {
        console.warn("LMS server signup failed or running in offline mock mode.", signupErr);
      }

      const defaultOptedSubjectId = subjects[0]?.id || optedSubjectId;
      const newProfile = {
        id: serverResult?.user?.id || `student-${Date.now()}`,
        name: name.trim(),
        username: email.trim().toLowerCase().split("@")[0],
        password: "",
        email: email.trim().toLowerCase(),
        role: "student" as const,
        selectedBoardId: boardId,
        selectedClassId: classId,
        age: age,
        location: location.trim(),
        optedSubjectId: defaultOptedSubjectId,
        xp: 100,
        level: 1,
        coins: 10,
        streak: 1,
        achievements: [
          {
            id: "ach-1",
            title: "Fresh Scholar",
            description: "Created a Nexora Learning account",
            icon: "🌱",
            unlockedAt: new Date().toLocaleDateString("en-IN"),
          },
        ],
        certificates: [],
      };

      saveRegisteredStudent(newProfile);

      // Store signup info temporarily for subscription flow
      localStorage.setItem(
        "pendingSubscription",
        JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName,
          lastName,
          role: role.toUpperCase(),
          profile: newProfile,
          signupTime: new Date().toISOString(),
        })
      );

      // Redirect to subscription/credentials page
      setView("get-credentials");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Registration failed. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnterWorkspace = () => {
    if (!registeredCredentials) return;
    const { profile, token } = registeredCredentials;

    if (token) {
      localStorage.setItem("auth_token", token);
    }

    useLmsStore.setState({ profile });

    const { addNotification } = useLmsStore.getState();
    addNotification(
      "Welcome to Nexora Learning!",
      `Academic profile successfully registered under ${profile.email}.`,
      "success",
    );

    if (profile.role === "student") {
      const currentBoards = useLmsStore.getState().boards;
      const activeBoardObj = currentBoards.find((b) => b.id === profile.selectedBoardId) || currentBoards[0];
      const activeClassObj = activeBoardObj?.classes?.find((c) => c.id === profile.selectedClassId) || activeBoardObj?.classes?.[0];
      const activeSubjects = activeClassObj?.subjects || [];
      const optedSub = activeSubjects.find((s) => s.id === profile.optedSubjectId) || activeSubjects[0];

      if (optedSub) {
        const firstChapter = optedSub.chapters[0];
        const firstTopic = firstChapter?.topics[0];
        useLmsStore
          .getState()
          .setActiveCourseContext(
            optedSub.id,
            firstChapter?.id || null,
            firstTopic?.id || null,
          );
        setView("student-dash");
      } else {
        setView("student-dash");
      }
    } else {
      setView("teacher-dash");
    }
    setShowCredentialsModal(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="absolute rounded-none blur-[120px] opacity-[0.05] pointer-events-none w-[450px] h-[450px] bg-brand-royal -top-20 -right-20" />
      <div className="absolute rounded-none blur-[120px] opacity-[0.05] pointer-events-none w-[400px] h-[400px] bg-brand-violet -bottom-20 -left-20" />

      {/* Brand logo header */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10 select-none">
        <div
          onClick={() => setView("landing")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <PlanetLogo className="w-8 h-8 group-hover:scale-102 transition-transform rounded-none" />
          <span className="font-extrabold font-display text-sm tracking-tight text-slate-900 group-hover:text-brand-violet transition-colors">
            Nexora Learning
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300" />
        <button
          onClick={() => setView("landing")}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Unified Registration Card */}
      <div className="w-full max-w-lg bg-white border border-slate-300 p-8 rounded-none relative z-10 shadow-xl my-16">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold font-display text-slate-900 uppercase tracking-wide text-center">
            <span>Create Academic Identity</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Register your Gmail to get generated credentials details delivered directly to your inbox.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-none">
            {error}
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-4 text-left">


          {/* Personal Details Row */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Prathamesh Sharma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                className={`premium-input text-xs rounded-none ${nameError ? "border-red-500" : ""}`}
                required
              />
              {nameError && <p className="text-[10px] text-red-500 mt-0.5">{nameError}</p>}
            </div>

            {/* Gmail Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Gmail Address</span>
              </label>
              <input
                type="email"
                placeholder="e.g. prathamesh@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className={`premium-input text-xs rounded-none ${emailError ? "border-red-500" : ""}`}
                required
              />
              {emailError && <p className="text-[10px] text-red-500 mt-0.5">{emailError}</p>}
            </div>


            {/* Age & Location Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 17"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setAgeError("");
                  }}
                  className={`premium-input text-xs rounded-none ${ageError ? "border-red-500" : ""}`}
                  required
                />
                {ageError && <p className="text-[10px] text-red-500 mt-0.5">{ageError}</p>}
              </div>

              {/* State autocomplete suggestions */}
              <div className="space-y-1 relative" ref={locationRef}>
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>State</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tamil Nadu"
                  value={location}
                  onChange={handleLocationChange}
                  onFocus={() => {
                    if (location.trim().length > 0 && filteredLocations.length > 0) {
                      setShowLocationSuggestions(true);
                    }
                  }}
                  className="premium-input text-xs rounded-none"
                  required
                />
                {showLocationSuggestions && filteredLocations.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-300 shadow-lg z-50 rounded-none max-h-40 overflow-y-auto">
                    {filteredLocations.map((loc, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setLocation(loc);
                          setShowLocationSuggestions(false);
                        }}
                        className="p-2.5 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer border-b border-slate-100 last:border-b-0"
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Setup Inputs (Merged) */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              {/* Board Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                  Academic Board
                </label>
                <select
                  value={boardId}
                  onChange={(e) => setBoardId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-none px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-all h-9"
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class Level Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                  Class Level
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-none px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-all h-9"
                >
                  {activeBoard.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action submission button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full premium-btn-primary py-3.5 text-xs font-bold rounded-none tracking-widest uppercase flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Registering Account..." : "Register and Get Credentials"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
          Already registered?{" "}
          <button
            onClick={() => setView("login")}
            className="text-brand-violet font-semibold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Credentials details modal on successful signup */}
      {showCredentialsModal && registeredCredentials && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-800 shadow-2xl p-8 max-w-md w-full rounded-none animate-fade-in-up text-left relative">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-none flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Registration Successful!</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Your credentials details have been sent to your Gmail inbox.
              </p>
            </div>

            <div className="space-y-3.5 mb-6">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Login Username / Email</label>
                <span className="text-xs font-semibold text-slate-800 break-all">{registeredCredentials.email}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Temporary Password</span>
                  <span className="text-[9px] text-rose-500 font-bold lowercase">Required for sign-in</span>
                </label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50/50 px-2 py-1 border border-rose-200/50">
                    {showTempPassword ? registeredCredentials.password : "••••••••"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowTempPassword(!showTempPassword)}
                      className="text-slate-500 hover:text-slate-800 text-[10px] font-semibold underline"
                    >
                      {showTempPassword ? "Hide" : "Show"}
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(registeredCredentials.password);
                        const { addNotification } = useLmsStore.getState();
                        addNotification("Copied!", "Password copied to clipboard.", "success");
                      }}
                      className="text-slate-500 hover:text-slate-800 text-[10px] font-semibold underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border-l-4 border-slate-800 p-3.5 rounded-none mb-6 flex gap-2 items-start">
              <Shield className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-600 leading-normal">
                Use your Gmail <strong>{registeredCredentials.email}</strong> and the generated password sent to your inbox to sign back in from any device. Make sure only one workspace session is active.
              </p>
            </div>

            <button
              onClick={handleEnterWorkspace}
              className="w-full premium-btn-primary py-3 text-xs rounded-none font-bold flex items-center justify-center gap-2"
            >
              <span>Enter LMS Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
