import React, { useState } from "react";
import { useLmsStore } from "../store/index";
import { BookOpen, ArrowRight, Search, Sparkles } from "lucide-react";

const SubjectCover: React.FC<{ subjectTitle: string }> = ({ subjectTitle }) => {
  const titleLower = subjectTitle.toLowerCase();
  
  let imageUrl = "";
  let bgColor = "bg-white";

  if (titleLower.includes("physics")) {
    imageUrl = "/physics.png";
    bgColor = "bg-[#fdfbf7]";
  } else if (titleLower.includes("chemistry")) {
    imageUrl = "/chemistry.png";
    bgColor = "bg-white";
  } else if (titleLower.includes("biology")) {
    imageUrl = "/biology.png";
    bgColor = "bg-white";
  } else if (titleLower.includes("science")) {
    imageUrl = "/science.png";
    bgColor = "bg-white";
  } else if (titleLower.includes("math")) {
    imageUrl = "/maths.png";
    bgColor = "bg-[#faf0e6]";
  }

  if (imageUrl) {
    return (
      <div className={`w-full aspect-[16/9] ${bgColor} relative flex items-center justify-center overflow-hidden rounded-t-xl border-b border-slate-100 dark:border-white/5 group`}>
        <img 
          src={imageUrl} 
          alt={subjectTitle} 
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" 
        />
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[9px] font-extrabold text-slate-800 dark:text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 z-10">
          <Sparkles className="w-2.5 h-2.5 text-brand-violet" />
          <span>Syllabus Notes</span>
        </span>
      </div>
    );
  }

  let gradient = "from-rose-500 to-pink-600";
  let icon = (
    <svg className="w-10 h-10 text-white/90 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  return (
    <div className={`w-full aspect-[16/9] bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden rounded-t-xl`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-white/10 blur-xl" />
      
      <div className="relative z-10 p-3 bg-white/15 rounded-xl border border-white/25 shadow-lg">
        {icon}
      </div>

      <span className="absolute top-3 right-3 bg-white/25 backdrop-blur-md border border-white/30 text-[9px] font-extrabold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5" />
        <span>Syllabus Notes</span>
      </span>
    </div>
  );
};

const ChapterCover: React.FC<{ subjectTitle: string; chapterTitle: string }> = ({ subjectTitle, chapterTitle }) => {
  const sTitleLower = subjectTitle.toLowerCase();
  const cTitleLower = chapterTitle.toLowerCase();
  
  let imageUrl = "";
  let bgColor = "bg-white";

  if (cTitleLower.includes("physics") || sTitleLower.includes("physics")) {
    imageUrl = "/physics.png";
    bgColor = "bg-[#fdfbf7]";
  } else if (cTitleLower.includes("chemistry") || sTitleLower.includes("chemistry")) {
    imageUrl = "/chemistry.png";
    bgColor = "bg-white";
  } else if (cTitleLower.includes("biology") || sTitleLower.includes("biology")) {
    imageUrl = "/biology.png";
    bgColor = "bg-white";
  } else if (cTitleLower.includes("science") || sTitleLower.includes("science")) {
    imageUrl = "/science.png";
    bgColor = "bg-white";
  } else if (cTitleLower.includes("math") || sTitleLower.includes("math")) {
    imageUrl = "/maths.png";
    bgColor = "bg-[#faf0e6]";
  }

  if (imageUrl) {
    return (
      <div className={`w-full aspect-[4/3] ${bgColor} relative flex items-center justify-center overflow-hidden rounded-t-xl border-b border-slate-100 dark:border-white/5 group`}>
        <img 
          src={imageUrl} 
          alt={chapterTitle} 
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" 
        />
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[9px] font-extrabold text-slate-800 dark:text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
          Chapter Notes
        </span>
      </div>
    );
  }

  let gradient = "from-rose-500 to-pink-600";
  let icon = (
    <svg className="w-10 h-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  if (sTitleLower.includes("math")) {
    gradient = "from-sky-500 to-blue-600";
    icon = (
      <svg className="w-10 h-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
      </svg>
    );
  }

  return (
    <div className={`w-full aspect-[4/3] bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden rounded-t-xl`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-white/10 blur-xl" />
      
      <div className="relative z-10 p-3 bg-white/15 rounded-xl border border-white/25 shadow-lg">
        {icon}
      </div>

      <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
        Chapter Notes
      </span>
    </div>
  );
};

export const NotesResourcesPage: React.FC = () => {
  const { boards, profile, setActiveCourseContext, setView } = useLmsStore();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const activeBoard = boards.find((b) => b.id === profile.selectedBoardId) || boards[0];
  const activeClass = activeBoard?.classes?.find((c) => c.id === profile.selectedClassId) || activeBoard?.classes?.[0];

  if (!activeBoard || !activeClass) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-royal"></div>
      </div>
    );
  }

  const subjects = activeClass?.subjects || [];

  // Filter subjects for the "All Subjects" view
  const filteredSubjects = subjects.filter((sub) => {
    return sub.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter chapters for the selected subject view
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectFilter);
  const chaptersOfSubject = selectedSubject
    ? selectedSubject.chapters.map((chap) => ({
        ...chap,
        subjectId: selectedSubject.id,
        subjectTitle: selectedSubject.title,
        subjectColor: selectedSubject.color,
      }))
    : [];

  const filteredChapters = chaptersOfSubject.filter((chap) => {
    return chap.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleOpenSubjectNotes = (subId: string) => {
    const subject = subjects.find((s) => s.id === subId);
    const firstChapter = subject?.chapters[0];
    const firstTopic = firstChapter?.topics[0];
    setActiveCourseContext(subId, firstChapter?.id || null, firstTopic?.id || null);
    setView("course-view");
  };

  const handleOpenNotes = (subjectId: string, chapterId: string, topics: any[]) => {
    const firstTopicId = topics?.[0]?.id || null;
    setActiveCourseContext(subjectId, chapterId, firstTopicId);
    setView("course-view");
  };

  const getSubTagColor = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("math")) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    if (t.includes("physics")) return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    if (t.includes("chemistry")) return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
    if (t.includes("biology") || t.includes("science")) return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
  };

  return (
    <div className="max-w-6xl mx-auto font-sans space-y-6 text-left animate-fade-in-up">
      {/* Banner Card */}
      <div className="glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-brand-violet dark:text-brand-violet-light font-bold uppercase tracking-wider block">
            Expert Study Notes
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            Deep lectures and notes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {selectedSubjectFilter === "all"
              ? "Comprehensive Tamil Nadu State Board study guides, notes, and interactive learning modules."
              : `Study guides, formulas, and revision materials for ${selectedSubject?.title}.`}
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={selectedSubjectFilter === "all" ? "Search subjects..." : "Search chapters..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-brand-royal transition-colors"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Subject Filter Tabs */}
        <div className="glass-card p-4 border-slate-200 dark:border-white/5 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedSubjectFilter("all");
              setSearchQuery("");
            }}
            className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all border ${
              selectedSubjectFilter === "all"
                ? "bg-brand-royal border-brand-royal text-white shadow-md"
                : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
          >
            All Subjects
          </button>
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectFilter(sub.id);
                setSearchQuery("");
              }}
              className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all border ${
                selectedSubjectFilter === sub.id
                  ? "bg-brand-royal border-brand-royal text-white shadow-md"
                  : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {sub.title}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {selectedSubjectFilter === "all" ? (
          filteredSubjects.length === 0 ? (
            <div className="glass-card p-12 text-center border-slate-200 dark:border-white/5">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-xs text-slate-500">No subjects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className="glass-card border-slate-200 dark:border-white/5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-brand-royal/30 transition-all duration-300 group overflow-hidden"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <SubjectCover subjectTitle={sub.title} />
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getSubTagColor(sub.title)} inline-block`}>
                          {sub.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {sub.chapters.length} Chapters
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenSubjectNotes(sub.id)}
                      className="mt-4 w-full py-2.5 bg-brand-royal hover:bg-brand-royal/90 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-brand-royal/10"
                    >
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          filteredChapters.length === 0 ? (
            <div className="glass-card p-12 text-center border-slate-200 dark:border-white/5">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-xs text-slate-500">No chapters found matching your criteria in this subject.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredChapters.map((chap) => (
                <div
                  key={chap.id}
                  className="glass-card border-slate-200 dark:border-white/5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg hover:border-brand-royal/30 transition-all duration-300 group overflow-hidden"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <ChapterCover subjectTitle={chap.subjectTitle} chapterTitle={chap.title} />
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 text-left">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getSubTagColor(chap.subjectTitle)} inline-block`}>
                        {chap.subjectTitle}
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {chap.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleOpenNotes(chap.subjectId, chap.id, chap.topics)}
                      className="mt-3 w-full py-2 bg-brand-royal hover:bg-brand-royal/90 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-brand-royal/10"
                    >
                      <span>Open Notes</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
