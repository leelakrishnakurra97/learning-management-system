import React, { useState, useEffect, useRef } from "react";
import { useLmsStore } from "../store/index";
import type { QuizQuestion, Quiz, QuizResult, Chapter } from "../store/types";
import {
  Trophy,
  Clock,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { generateQuizForChapter } from "../utils/quizGenerator";

export const QuizInterface: React.FC = () => {
  const {
    activeView,
    boards,
    quizzes,
    activeQuizId,
    setActiveQuiz,
    submitQuizResult,
    setView,
    setActiveCourseContext,
    profile,
  } = useLmsStore();

  const activeBoard =
    boards.find((b) => b.id === profile.selectedBoardId) || boards[0];

  // Selection states (Class-level and Subject-level selections)
  const [selectedClassId, setSelectedClassId] = useState(
    profile.selectedClassId || "class-9",
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    profile.optedSubjectId || "maths-9",
  );
  const [currentGeneratedQuiz, setCurrentGeneratedQuiz] = useState<Quiz | null>(
    null,
  );

  // Sync selectedClassId with registered profile class
  useEffect(() => {
    if (profile.selectedClassId) {
      setSelectedClassId(profile.selectedClassId);
      const activeClass =
        activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) ||
        activeBoard?.classes?.[0];
      const classSubjects = activeClass?.subjects || [];
      if (
        classSubjects.length > 0 &&
        !classSubjects.some((s) => s.id === selectedSubjectId)
      ) {
        setSelectedSubjectId(classSubjects[0].id);
      }
    }
  }, [profile.selectedClassId, activeBoard]);

  // If a quiz is selected globally via activeQuizId, use it; otherwise use the local generated quiz.
  const globalQuiz = quizzes.find((q) => q.id === activeQuizId);
  const activeQuiz = globalQuiz || currentGeneratedQuiz;

  // Active Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);

  // Sync state when activeQuizId or activeQuiz changes
  useEffect(() => {
    if (activeQuiz) {
      setTimeLeftSeconds(activeQuiz.durationMinutes * 60);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setResult(null);
      setCountdown(3);
    }
  }, [activeQuizId, activeQuiz?.id]);

  // Timer Countdown
  useEffect(() => {
    if (activeQuiz && !isSubmitted && countdown === null) {
      timerRef.current = window.setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted, activeQuiz?.id, countdown]);

  // Countdown overlay timer
  useEffect(() => {
    if (countdown !== null) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else if (countdown === 1) {
          setCountdown(0);
        } else {
          setCountdown(null);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleAutoSubmit = () => {
    handleQuizSubmit();
  };

  const handleQuizSubmit = () => {
    if (!activeQuiz || isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    let score = 0;
    const incorrectDetails: QuizResult["incorrectAnswersDetails"] = [];

    // Find first topic of the chapter being quizzed to use as recommendedTopicId
    let firstTopicId = "";
    const chapterId = activeQuiz.id.replace("quiz-gen-", "");
    for (const b of boards) {
      for (const c of b.classes) {
        for (const s of c.subjects) {
          const chap = s.chapters.find((ch) => ch.id === chapterId);
          if (chap && chap.topics.length > 0) {
            firstTopicId = chap.topics[0].id;
            break;
          }
        }
      }
    }
    if (!firstTopicId) {
      firstTopicId =
        activeQuiz.subjectId === "maths-12"
          ? "matrices-determinants-12-t1"
          : "chemistry-12-c1-t1";
    }

    activeQuiz.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correctAnswerIndex) {
        score += 1;
      } else {
        incorrectDetails.push({
          question: q.question,
          yourAnswer:
            selected !== undefined ? q.options[selected] : "Not Attempted",
          correctAnswer: q.options[q.correctAnswerIndex],
          explanation: q.explanation,
          recommendedTopicId: firstTopicId,
        });
      }
    });

    const timeSpent = activeQuiz.durationMinutes * 60 - timeLeftSeconds;

    const finalResult: QuizResult = {
      quizId: activeQuiz.id,
      title: activeQuiz.title,
      score,
      totalQuestions: activeQuiz.questions.length,
      timeTakenSeconds: timeSpent,
      date: new Date().toLocaleDateString("en-IN"),
      incorrectAnswersDetails: incorrectDetails,
    };

    setResult(finalResult);
    submitQuizResult(finalResult);

    // Add notification
    useLmsStore
      .getState()
      .addNotification(
        "Quiz Evaluated",
        `You scored ${score}/${activeQuiz.questions.length} on "${activeQuiz.title}".`,
        score === activeQuiz.questions.length ? "success" : "info",
      );
  };

  const handleResetQuiz = () => {
    if (!activeQuiz) return;
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(activeQuiz.durationMinutes * 60);
    setIsSubmitted(false);
    setResult(null);
  };

  const handleExitQuiz = () => {
    setActiveQuiz(null); // Clear global store quiz selection
    setCurrentGeneratedQuiz(null);
    setIsSubmitted(false);
    setResult(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    if (activeView === "quiz-view") {
      setView("course-view");
    }
  };

  const handleStartChapterQuiz = (chapter: Chapter) => {
    const generatedQuiz = generateQuizForChapter(
      selectedClassId,
      selectedSubjectId,
      chapter.id,
      chapter.title,
    );
    setCurrentGeneratedQuiz(generatedQuiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(generatedQuiz.durationMinutes * 60);
    setIsSubmitted(false);
    setResult(null);
  };

  // Derive helper objects for the dashboard selectors
  const activeClass =
    activeBoard?.classes?.find((c) => c.id === selectedClassId) ||
    activeBoard?.classes?.[0];

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  const subjects = activeClass?.subjects || [];
  const activeSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const chapters = activeSubject?.chapters || [];

  // ==========================================
  // VIEW: CHAPTER SELECTION DASHBOARD
  // ==========================================
  if (!activeQuiz) {
    return (
      <div className="max-w-4xl mx-auto font-sans space-y-6 text-left animate-fade-in-up">
        {/* Banner Card */}
        <div className="glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-brand-violet dark:text-brand-violet-light font-bold uppercase tracking-wider block">
              Assessment Hub
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Scholastic Quiz Center
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Select your class and subject to view all chapters. Take timed
              assessments to verify your syllabus mastery.
            </p>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Subject selector */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-3">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Select Subject
            </label>
            <div className="flex gap-2">
              {subjects.map((sub) => {
                const isSelected = selectedSubjectId === sub.id;
                const isChem =
                  sub.title.toLowerCase().includes("chemistry") ||
                  sub.id.toLowerCase().includes("chemistry");
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`py-2 px-6 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? isChem
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                          : "bg-brand-royal border-brand-royal text-white shadow-md"
                        : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Available Chapter Assessments ({chapters.length})
            </h4>
            <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-white/5">
              Class {selectedClassId.replace("class-", "")} •{" "}
              {activeSubject?.title}
            </span>
          </div>

          {chapters.length === 0 ? (
            <div className="glass-card p-12 text-center border-slate-200 dark:border-white/5">
              <p className="text-xs text-slate-500">
                No chapters defined for this subject.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
              {chapters.map((chap) => (
                <div
                  key={chap.id}
                  className="glass-card p-5 border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-brand-royal/20 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-brand-royal/5 text-left"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-brand-violet bg-brand-violet/5 border border-brand-violet/15 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      Chapter Module
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {chap.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal line-clamp-2">
                      Test your understanding of the concepts introduced in this
                      chapter of the Class{" "}
                      {selectedClassId.replace("class-", "")} Samacheer Kalvi
                      syllabus.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4 mt-4">
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" /> 15 MCQs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 15 Mins
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartChapterQuiz(chap)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-royal dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-brand-royal/30 text-xs font-bold text-brand-royal hover:text-white dark:hover:text-white transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Start Quiz</span>
                      <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion: QuizQuestion =
    activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;

  if (activeQuiz && countdown !== null) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white font-sans overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-royal/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-violet/10 blur-[150px] rounded-full animate-pulse-slow" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center space-y-8 animate-fade-in-up">
          <div className="space-y-2">
            <span className="text-[10px] text-brand-violet-light font-extrabold uppercase tracking-widest bg-brand-violet/10 px-3 py-1 rounded-full border border-brand-violet/25">
              Get Ready to Excel
            </span>
            <h2 className="text-xl font-bold tracking-tight text-slate-350">
              {activeQuiz.title}
            </h2>
          </div>

          {/* Glowing Circular Countdown */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Spinning/pulsing rings */}
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-brand-royal border-r-brand-violet rounded-full animate-spin duration-1000" />
            <div className="absolute -inset-3 border border-brand-royal/10 rounded-full animate-ping-slow" />

            <div className="w-32 h-32 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center shadow-2xl relative overflow-hidden">
              {/* Radial gradient inside circle */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-royal/20 to-transparent" />
              <span className="text-6xl font-black font-display tracking-tight text-white relative z-10">
                {countdown > 0 ? countdown : "GO!"}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Keep your focus. The examination starts in a few moments.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE TEST & RESULTS INTERFACES
  // ==========================================
  const isFullscreen = activeView === "quiz-view";

  return (
    <div className={`${isFullscreen ? "max-w-5xl px-4 py-8" : "max-w-3xl"} mx-auto font-sans`}>
      {isFullscreen && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-wider text-brand-royal dark:text-white uppercase font-display">
              NEXORA EXAM PORTAL
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
              Secured Connection
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider font-sans">
            Student: <span className="text-slate-800 dark:text-white font-bold">{profile.name}</span>
          </div>
        </div>
      )}
      {!isSubmitted ? (
        // ACTIVE TEST INTERFACE
        <div className="space-y-6 animate-fade-in-up">
          {/* Header Bar */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
            <div>
              <span className="text-[10px] text-brand-violet dark:text-brand-violet-light font-bold uppercase tracking-wider">
                Active Assessment
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {activeQuiz.title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <Clock className="w-4.5 h-4.5 text-brand-violet" />
                <span>Timer: {formatTime(timeLeftSeconds)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleExitQuiz}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-red-500/10 border border-slate-200 dark:bg-slate-900 dark:border-white/5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all active:scale-95"
                >
                  Exit
                </button>
                <button
                  onClick={handleQuizSubmit}
                  className="premium-btn-primary py-2 px-4 text-xs font-semibold"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
            <div className="flex gap-2">
              {activeQuiz.questions.map((q, idx) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const isActive = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${
                      isActive
                        ? "border-brand-royal bg-brand-royal text-white shadow-lg"
                        : isSelected
                          ? "border-brand-violet/30 bg-brand-violet/10 text-brand-violet"
                          : "border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {Object.keys(selectedAnswers).length} of {totalQuestions} Answered
            </div>
          </div>

          {/* Question Sheet */}
          <div className="glass-card p-6 border-slate-200 dark:border-white/5 text-left space-y-6">
            <div className="flex gap-3 items-start">
              <span className="text-sm font-bold text-brand-violet uppercase tracking-wider mt-0.5">
                Q{currentQuestionIndex + 1}.
              </span>
              <h4 className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3 pl-0 sm:pl-7">
              {currentQuestion.options.map((opt, idx) => {
                const isChosen = selectedAnswers[currentQuestion.id] === idx;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 ${
                      isChosen
                        ? "border-brand-royal bg-brand-royal/10 text-brand-royal dark:text-white shadow-lg"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-900/40 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isChosen
                          ? "bg-brand-royal text-white"
                          : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-500"
                      }`}
                    >
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="premium-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(totalQuestions - 1, prev + 1),
                  )
                }
                className="px-5 py-2 rounded-xl bg-brand-royal hover:bg-brand-royal/90 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-brand-royal/20"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleQuizSubmit}
                className="px-6 py-2.5 rounded-xl bg-brand-royal hover:bg-brand-royal/90 text-white text-xs font-bold transition-all active:scale-95 shadow-md shadow-brand-royal/20"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      ) : (
        // RESULTS SHEET SUMMARY
        <div className="space-y-6 animate-fade-in-up text-left">
          {/* Main Results Card */}
          <div className="glass-card p-8 border-slate-200 dark:border-violet-500/20 bg-white dark:bg-slate-950/40 text-center space-y-6 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-violet/10 blur-[80px] rounded-full" />

            <div className="w-16 h-16 rounded-2xl bg-brand-royal flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-royal/20">
              <Trophy className="w-8 h-8 fill-current" />
            </div>

            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                Evaluation Complete
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {activeQuiz.title} Results
              </h3>
            </div>

            {/* Score Ring */}
            <div className="flex justify-center items-center gap-8 py-4">
              <div className="text-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {result?.score}
                </span>
                <span className="text-slate-500 text-lg">
                  {" "}
                  / {result?.totalQuestions}
                </span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Correct Answers
                </p>
              </div>
              <div className="w-[1px] h-12 bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {result
                    ? Math.round((result.score / result.totalQuestions) * 100)
                    : 0}
                  %
                </span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3">
                  Final Grade
                </p>
              </div>
              <div className="w-[1px] h-12 bg-slate-200 dark:bg-white/10" />
              <div className="text-center font-mono">
                <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">
                  {result ? formatTime(result.timeTakenSeconds) : "00:00"}
                </span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3">
                  Time taken
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleResetQuiz}
                className="premium-btn-secondary px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-Attempt Test</span>
              </button>

              <button
                onClick={handleExitQuiz}
                className="premium-btn-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Back to Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Remedial AI Suggestions / Incorrect Answers Review */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-left">
              Weak Area Review & Incorrect Answers
            </h4>

            {result?.incorrectAnswersDetails.length === 0 ? (
              <div className="glass-card p-6 border-slate-200 dark:border-white/5 flex gap-4 text-left items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Flawless Conceptual Mastery!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    You answered all questions correctly. No remedial reading is
                    recommended. You received a perfect score certificate in
                    your profile panel!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-left">
                {result?.incorrectAnswersDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-5 border-slate-200 dark:border-white/5 text-left space-y-4"
                  >
                    <div>
                      <span className="text-[9px] bg-red-500/10 text-red-600 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                        Review Question {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-3 leading-relaxed">
                        {detail.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">
                          Your Choice:
                        </span>
                        <p className="text-slate-800 dark:text-slate-300 font-medium mt-1">
                          {detail.yourAnswer}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-[9px] text-emerald-600 font-bold uppercase">
                          Correct Answer:
                        </span>
                        <p className="text-emerald-700 dark:text-emerald-300 font-medium mt-1">
                          {detail.correctAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="text-[9px] text-brand-violet font-bold uppercase block mb-1">
                        Explanation:
                      </span>
                      <p className="leading-relaxed">{detail.explanation}</p>
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
