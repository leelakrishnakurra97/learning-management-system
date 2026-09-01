import React, { useState, useEffect } from "react";
import { ShieldCheck, Check, CreditCard, BookOpen, UserCheck, ArrowRight, AlertCircle, Loader } from "lucide-react";
import { authAPI } from "../services/api";

export const GetCredentialsPage: React.FC = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get email from localStorage (set during signup)
    const pendingData = localStorage.getItem("pendingSubscription");
    if (pendingData) {
      try {
        const data = JSON.parse(pendingData);
        setEmail(data.email);
        setFirstName(data.firstName);
        setRole(data.role);
      } catch (e) {
        console.error("Failed to parse pending subscription:", e);
      }
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    setIsSubscribing(true);
    setError("");

    try {
      // Call the subscribe endpoint
      const response = await authAPI.subscribe(email, "Full Academic Access Pass");
      
      // Show success state
      setIsSubscribed(true);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.hash = "#/login";
      }, 2000);
    } catch (err: any) {
      console.error("Subscription error:", err);
      setError(err?.message || "Subscription failed. Please try again.");
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-dark flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-royal/10 dark:bg-brand-royal/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-violet/10 dark:bg-brand-violet/20 blur-[130px] rounded-full animate-pulse-slow pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10 space-y-8 animate-fade-in-up">
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/20 dark:bg-brand-royal/20 text-brand-royal dark:text-blue-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-violet" />
            <span>Secure Activation Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-none">
            Nexora Learning
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            {isSubscribed
              ? "Your account has been activated! Check your email for login credentials."
              : "Activate your scholar account subscription to access premium learning features."}
          </p>
        </div>

        {!isSubscribed ? (
          /* SUBSCRIPTION PACKAGE INTERFACE */
          <div className="glass-card p-6 md:p-8 border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/45 shadow-2xl space-y-6 text-left">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Full Academic Access
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Activate your account and receive login credentials by email.
                </p>
              </div>

              {email && (
                <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-lg p-4">
                  <p className="text-sm text-slate-900 dark:text-slate-100">
                    <strong>Account Email:</strong> <span className="font-mono">{email}</span>
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="w-full premium-btn-primary py-4 font-extrabold text-sm flex items-center justify-center gap-2 rounded-xl shadow-lg hover:shadow-brand-royal/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? (
                    <>
                      <Loader className="w-4.5 h-4.5 animate-spin" />
                      <span>Processing Activation...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4.5 h-4.5" />
                      <span>Activate Account</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center leading-normal">
                Your secure login credentials will be sent to your registered email once activation completes.
              </p>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="glass-card p-6 md:p-8 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 shadow-2xl space-y-6 text-center relative overflow-hidden animate-fade-in-up">
            {/* Corner glowing icon (removed sparkle star) */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center pointer-events-none" />

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-500">
                <Check className="w-8 h-8" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                Subscription Activated! ✅
              </h3>
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                Your account has been successfully activated.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg p-4 text-left space-y-3">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  📧 Email Sent To:
                </p>
                <p className="text-sm text-slate-900 dark:text-white font-mono">{email}</p>
              </div>
              <div className="border-t border-slate-200 dark:border-white/10 pt-3">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  📋 What to Expect:
                </p>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
                  <li>Login credentials sent to your email</li>
                  <li>Full access to all learning materials</li>
                  <li>AI tutor support enabled</li>
                  <li>Live classes available</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Redirecting to login page in a few seconds...
            </p>

            <div className="pt-2">
              <a
                href="#/login"
                className="inline-block premium-btn-primary px-8 py-3 font-bold text-sm flex items-center justify-center gap-2 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Go to Login</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500">
            Secure Activation Portal Powered by Nexora Learning Shield © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
