'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, X, Info, Lock, Star, Download, ArrowRight } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface SearchLoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  from: string;
  to: string;
  ad?: Advertisement | null;
}

export const SearchLoadingModal: React.FC<SearchLoadingModalProps> = ({
  isOpen,
  onComplete,
  from,
  to,
  ad
}) => {
  const totalDisplayTime = ad?.displaySeconds || 15;
  const compulsorySkipTime = ad?.skipAfterSeconds ?? 5;

  const [secondsRemaining, setSecondsRemaining] = useState(totalDisplayTime);
  const [skipTimer, setSkipTimer] = useState(compulsorySkipTime);
  const [canSkip, setCanSkip] = useState(compulsorySkipTime === 0);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsRemaining(totalDisplayTime);
    setSkipTimer(compulsorySkipTime);
    setCanSkip(compulsorySkipTime === 0);

    if (ad && ad.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'impression' })
      }).catch(() => {});
    }

    // Auto finish timer
    const autoFinishTimer = setTimeout(() => {
      onCompleteRef.current();
    }, totalDisplayTime * 1000);

    // Skip unlock timer
    const skipUnlockTimer = setTimeout(() => {
      setCanSkip(true);
    }, compulsorySkipTime * 1000);

    const countdownInterval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
      setSkipTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(autoFinishTimer);
      clearTimeout(skipUnlockTimer);
      clearInterval(countdownInterval);
    };
  }, [isOpen, totalDisplayTime, compulsorySkipTime, ad]);

  if (!isOpen) return null;

  const handleAdClick = () => {
    if (ad && ad.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'click' })
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] w-full max-w-full h-[100dvh] bg-[#141414] text-white flex flex-col justify-between overflow-hidden select-none animate-slide-up">
      
      {/* 1. TOP HEADER BAR - HIGH CONTRAST & FULLY VISIBLE TIMER / CLOSE BUTTON */}
      <div className="w-full bg-[#1e1e1e] border-b border-[#333333] px-3 sm:px-6 py-3 flex items-center justify-between z-30 shrink-0">
        
        {/* TIMER LOCK OR UNLOCKED CLOSE BUTTON */}
        <div className="flex items-center gap-2">
          {canSkip ? (
            <button
              onClick={onComplete}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg hover:scale-105 cursor-pointer active:scale-95"
              title="Close Ad and View Results"
            >
              <span>Close Ad</span>
              <X className="w-4 h-4 text-slate-950" />
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-[#2a2a2a] border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Skip in <strong className="text-white font-mono text-sm font-black">{skipTimer}s</strong></span>
            </div>
          )}
        </div>

        {/* MERCHANT LOGO & HEADER INFO */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-md">
            {ad?.advertiserName ? ad.advertiserName.charAt(0) : 'A'}
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs sm:text-base font-bold text-white tracking-tight truncate">
                {ad?.advertiserName || 'Thiruvilwamala Partner'}
              </h2>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded shrink-0">
                Verified
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-slate-300 text-[10px] ml-1 font-mono font-normal">(1,420)</span>
            </div>
          </div>
        </div>

        {/* TIMER COUNTDOWN DISPLAY */}
        <div className="flex items-center gap-1 text-xs text-slate-300 font-mono bg-[#2a2a2a] px-2.5 py-1 rounded-lg border border-slate-700">
          <span className="text-slate-400 hidden sm:inline">Ad ends:</span>
          <strong className="text-emerald-400 font-bold">{secondsRemaining}s</strong>
        </div>
      </div>

      {/* 2. CENTER HIGH-IMPACT MEDIA CANVAS (SUPPORTING VIDEO OR POSTER) */}
      <div className="relative flex-1 w-full bg-[#0a0a0a] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {ad?.mediaType === 'video' && ad?.videoUrl ? (
          <div className="relative w-full h-full max-h-[60vh] sm:max-h-[70vh] rounded-2xl overflow-hidden bg-black border border-[#333]">
            <video
              src={ad.videoUrl}
              autoPlay
              muted
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="relative w-full h-full max-h-[60vh] sm:max-h-[70vh] rounded-2xl overflow-hidden bg-[#1c1c1c] border border-[#333] shadow-2xl">
            <Image
              src={ad?.image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1600&auto=format&fit=crop'}
              alt={ad?.title || 'Full Screen Sponsor Ad'}
              fill
              className="object-cover sm:object-contain"
              priority
              sizes="100vw"
              unoptimized={ad?.image?.startsWith('data:')}
            />
          </div>
        )}
      </div>

      {/* 3. BOTTOM GOOGLE ADMOB ACTION & DESCRIPTION BLOCK */}
      <div className="p-4 sm:p-5 bg-[#1e1e1e] border-t border-[#333333] space-y-3 relative z-30 shrink-0">
        <div className="text-center space-y-1">
          <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
            {ad?.title || 'Thiruvilwamala Special Local Offer'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed line-clamp-2 font-medium">
            {ad?.description || 'Authentic traditional sweets, handloom weaving, restaurants & breakdown services in Thiruvilwamala.'}
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="pt-1 flex flex-col items-center gap-2">
          <a
            href={ad?.targetUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAdClick}
            className="w-full sm:max-w-md h-12 sm:h-13 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-sm border border-blue-500 shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer uppercase tracking-wider"
          >
            <ExternalLink className="w-4 h-4 text-white" />
            <span>{ad?.ctaText || 'VISIT & EXPLORE STORE'}</span>
          </a>

          {canSkip && (
            <button
              onClick={onComplete}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              <span>Continue to Bus Schedules →</span>
            </button>
          )}
        </div>

        {/* GOOGLE ADCHOICES ICON */}
        <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[9px] text-slate-500 font-mono">
          <div className="w-3.5 h-3.5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[8px]">
            i
          </div>
          <span>AdChoices</span>
        </div>
      </div>

    </div>
  );
};
