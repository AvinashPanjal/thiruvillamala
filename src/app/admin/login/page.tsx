'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bus, ShieldCheck, KeyRound, Mail, ArrowRight, Lock, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@thiruvilwamala.live');
  const [password, setPassword] = useState('thiruvilwamala2026');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo Authentication verification
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        // Set cookie/localStorage flag for demo session
        document.cookie = "admin_session=authenticated; path=/; max-age=86400";
        router.push('/admin');
      } else {
        setError('Please enter valid credentials.');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    document.cookie = "admin_session=authenticated; path=/; max-age=86400";
    setTimeout(() => {
      router.push('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Atmosphere */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-900/40">
              <Bus className="w-6 h-6" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Thiruvilwamala Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Local Platform Content &amp; Advertisement Management Desk
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel-light rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Demo Admin Access
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Protected Area
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="admin@thiruvilwamala.live"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Log In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Quick Demo Login Button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-900 hover:bg-amber-500/20 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>1-Click Demo Login (Pre-authenticated)</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Thiruvilwamala Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
