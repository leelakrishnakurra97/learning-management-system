import React from "react";
import { useLmsStore } from "../store/index";
import {
  Award,
  Heart,
  Calendar,
  ShieldCheck,
  CreditCard,
  Sparkles,
  CheckCircle,
  Flame,
  Zap,
  Trophy,
} from "lucide-react";

export const StudentProfile: React.FC = () => {
  const { profile, boards } = useLmsStore();

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

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Upper Profile Banner */}
      <div className="glass-card p-6 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-violet/10 blur-[80px] rounded-full" />

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Large Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-brand-royal flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-royal/20">
            {profile.name[0]}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {profile.name}
              <span className="text-[10px] bg-brand-violet/10 text-brand-violet dark:text-brand-violet-light border border-brand-violet/20 font-bold px-2 py-0.5 rounded-full">
                Level {profile.level} Scholar
              </span>
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-400 mt-1">
              {profile.email} • {profile.role.toUpperCase()} ACCOUNT
              {profile.age && ` • Age: ${profile.age}`}
              {profile.location && ` • Location: ${profile.location}`}
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-500 font-semibold mt-1">
              Curriculum: {activeBoard.title} /{" "}
              {activeClass?.title || "Class 12"}
            </p>
          </div>
        </div>

        {/* Dynamic Analytics Stats */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto fill-orange-500/20" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
              {profile.streak} Days
            </span>
            <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">
              Streak
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-center">
            <Zap className="w-5 h-5 text-yellow-500 mx-auto fill-yellow-500/20" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
              {profile.coins}
            </span>
            <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">
              Coins
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-center">
            <Trophy className="w-5 h-5 text-violet-500 mx-auto fill-violet-500/20" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">
              {profile.xp}
            </span>
            <span className="text-[9px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-wider block">
              Total XP
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Certificates and Achievements (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certificates Listing */}
          <div className="glass-card p-6 border-slate-200 dark:border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3">
              <Award className="w-4.5 h-4.5 text-brand-royal" />
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                Mastery Certificates
              </h3>
            </div>

            {profile.certificates.length === 0 ? (
              <p className="text-xs text-slate-600 dark:text-slate-500 text-center py-6">
                No certificates earned. Score 100% on a quiz to unlock badge
                credentials.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 space-y-3 relative overflow-hidden group"
                  >
                    {/* Visual Border Glow on hover */}
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-brand-royal" />

                    <div className="text-left">
                      <span className="text-[9px] text-brand-violet dark:text-brand-violet-light font-bold uppercase tracking-wider">
                        Nexora Learning Academic Certification
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 group-hover:text-brand-violet transition-colors dark:group-hover:text-brand-violet-light">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-500 mt-1">
                        Issued by {cert.issuer} on {cert.date}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] bg-slate-100 dark:bg-slate-950 p-2 rounded-lg font-medium text-slate-700 dark:text-slate-400">
                      <span>Grade achieved:</span>
                      <span className="text-emerald-605 dark:text-emerald-400 font-bold">
                        {cert.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gamified Achievements Grid */}
          <div className="glass-card p-6 border-slate-200 dark:border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3">
              <Sparkles className="w-4.5 h-4.5 text-brand-violet dark:text-brand-violet-light" />
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                Unlocked Milestones
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-center flex flex-col items-center justify-between min-h-[130px]"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 flex items-center justify-center text-lg shadow-inner">
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">
                      {ach.title}
                    </h4>
                    <p className="text-[9px] text-slate-600 dark:text-slate-500 mt-1 leading-normal">
                      {ach.description}
                    </p>
                  </div>
                  <span className="text-[9px] text-brand-royal font-semibold mt-2">
                    Unlocked {ach.unlockedAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Subscription & billing detail */}
        <div className="space-y-6">
          {/* Elite Billing Details */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3">
              <CreditCard className="w-4.5 h-4.5 text-brand-violet dark:text-brand-violet-light" />
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                Subscription Membership
              </h3>
            </div>

            <div className="text-left space-y-3">
              <span className="text-[9px] bg-brand-violet/10 text-brand-violet dark:text-brand-violet-light border border-brand-violet/20 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                Nexora Learning Premium Elite
              </span>

              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                ₹30,000
                <span className="text-xs text-slate-600 dark:text-slate-500 font-medium">
                  {" "}
                  / Month
                </span>
              </h4>

              <p className="text-[10px] text-slate-700 dark:text-slate-400 leading-relaxed">
                Active plan includes Expert Educator mentorship sessions,
                physical study books delivered to your door, and parental
                dashboard audit log reports.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 text-xs text-left space-y-2.5 font-medium">
              <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400">
                <span>Billing Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 fill-current" /> Active
                  Mandate
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400">
                <span>Next Invoice Date:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  July 11, 2026
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400">
                <span>Payment Mode:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono">
                  VISA •••• 4242
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                alert(
                  "Billing Management interface is mocked for this prototype demonstration.",
                )
              }
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/5 hover:border-slate-300 hover:bg-slate-200 dark:hover:bg-slate-950 text-slate-800 dark:text-white text-xs font-semibold transition-all active:scale-95"
            >
              Manage Billing Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
