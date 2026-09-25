'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bus, MapPin, Sparkles, ShieldCheck, Menu, X, Clock, Compass } from 'lucide-react';
import { TimePeriod } from '@/lib/types';

interface NavbarProps {
  currentTimePeriod?: TimePeriod;
  onTimePeriodChange?: (period: TimePeriod) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTimePeriod, onTimePeriodChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top micro announcement bar */}
      <div className="bg-blue-900 border-b border-blue-800 px-4 py-1 text-xs text-blue-100 text-center flex items-center justify-center gap-2 font-medium">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Thiruvilwamala Official Local Portal &amp; Transit Timetables</span>
        <span className="hidden md:inline bg-blue-800 text-blue-200 px-2 py-0.5 rounded text-[10px] border border-blue-700 font-mono">
          Thrissur, Kerala
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  Thiruvilwamala<span className="text-blue-600 font-extrabold">.Live</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold tracking-wide">
                തിരുവില്വാമല ഡിജിറ്റൽ ഇൻഫോ പോർട്ടൽ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/bus-search"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Bus className="w-4 h-4 text-blue-600" />
              <span>Bus Timetable</span>
            </Link>
            <Link
              href="/#explore"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Explore Places</span>
            </Link>
            <Link
              href="/#features"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Services</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {currentTimePeriod && onTimePeriodChange && (
              <div className="flex items-center bg-slate-100 border border-slate-300 rounded-full p-1 text-xs">
                {(['morning', 'afternoon', 'evening', 'night'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => onTimePeriodChange(period)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize transition-all cursor-pointer ${
                      currentTimePeriod === period
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}

            <Link
              href="/admin/login"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Login</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-slate-900 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/bus-search"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
          >
            <Bus className="w-5 h-5 text-blue-600" />
            Bus Timetable &amp; Search
          </Link>
          <Link
            href="/#explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <Compass className="w-5 h-5 text-amber-600" />
            Explore Places
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            Services
          </Link>

          <div className="pt-3 border-t border-slate-200">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-center text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
