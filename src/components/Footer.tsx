'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bus, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'about' | null>(null);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-8 border-b border-slate-800">
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Thiruvilwamala<span className="text-blue-400">.Live</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-medium">
              Everything you need to know around Thiruvilwamala. Local bus timetables, connecting route maps, intermediate stops, and community digital services for residents and travelers.
            </p>
            <p className="text-xs font-serif italic text-blue-400 font-bold">
              തിരുവില്വാമല, തൃശ്ശൂർ ജില്ല, കേരളം
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home &amp; Time Atmosphere
                </Link>
              </li>
              <li>
                <Link href="/bus-search" className="hover:text-blue-400 transition-colors">
                  Bus Search &amp; Timetables
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-blue-400 transition-colors">
                  Explore Thiruvilwamala
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-400 transition-colors">
                  Community Services
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" /> Admin Management
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Local Platform Notes</h4>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  About Thiruvilwamala Connect
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy &amp; Google AdSense Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Terms of Service &amp; Disclaimer
                </button>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-amber-400 block mb-0.5">Google AdSense Enabled:</span>
              This demo platform includes full-screen interstitial loading ads, native in-feed search ads, and sticky bottom anchor ad units.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Thiruvilwamala.Live • Designed for Thiruvilwamala Community</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Kerala
            </span>
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white capitalize">
                {activeModal === 'about' && 'About Thiruvilwamala Platform'}
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Service & Disclaimer'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3 max-h-80 overflow-y-auto">
              {activeModal === 'about' && (
                <p>
                  Thiruvilwamala.Live is an independent local digital information initiative created to serve residents and travelers with real-time transit schedules and community services.
                </p>
              )}
              {activeModal === 'privacy' && (
                <p>
                  We prioritize user privacy. AdSense sponsored units collect anonymous metrics to measure campaign reach without tracking identity details.
                </p>
              )}
              {activeModal === 'terms' && (
                <p>
                  Bus schedules represent standard operating timetables compiled for public convenience. Actual timings may fluctuate due to traffic or weather.
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
