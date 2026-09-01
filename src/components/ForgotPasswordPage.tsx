import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { useLmsStore } from '../store/index';

export const ForgotPasswordPage: React.FC = () => {
  const { setView } = useLmsStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) return setError('Please enter your email');
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setMessage('OTP sent to your email. Redirecting to Reset Password...');
      window.setTimeout(() => setView('reset-password'), 1400);
    } catch (err: any) {
      const message = err?.message || 'Failed to send OTP';
      if (message.toLowerCase().includes('user not found')) {
        setError('Email is not registered. Enroll the account and get the credentials.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Forgot Password</h3>
        <p className="text-sm text-slate-600 mb-4">Enter your registered email to receive a 6-digit OTP.</p>
        {message && <div className="mb-3 text-green-700">{message}</div>}
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-brand-royal text-white py-2 rounded" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <button type="button" className="flex-1 border py-2 rounded" onClick={() => setView('login')}>
              Back to Login
            </button>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            After receiving the OTP, go to Reset Password to set a new password.
          </div>
          <div className="mt-2">
            <button type="button" onClick={() => setView('reset-password')} className="text-xs text-brand-violet underline">Go to Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};
