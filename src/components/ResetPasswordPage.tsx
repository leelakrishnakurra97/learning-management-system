import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { useLmsStore } from '../store/index';

export const ResetPasswordPage: React.FC = () => {
  const { setView } = useLmsStore();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email || !otp || !password || !confirm) return setError('Please fill all fields');
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    setLoading(true);
    try {
      await authAPI.resetPassword(email, otp, password);
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => setView('login'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Reset Password</h3>
        {message && <div className="mb-3 text-green-700">{message}</div>}
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" placeholder="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="text" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Re-enter new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-brand-royal text-white py-2 rounded" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
            <button type="button" className="flex-1 border py-2 rounded" onClick={() => setView('login')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
