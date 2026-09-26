'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, RefreshCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface RotatingAdBannerProps {
  ads: Advertisement[];
  defaultIntervalSeconds?: number;
  className?: string;
}

export const RotatingAdBanner: React.FC<RotatingAdBannerProps> = ({
  ads,
  defaultIntervalSeconds = 5,
  className = ''
}) => {
  const [allAds, setAllAds] = useState<Advertisement[]>(ads);

  useEffect(() => {
    let combined = [...ads];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('thiruvilwamala_custom_ads');
      if (stored) {
        try {
          const customAds: Advertisement[] = JSON.parse(stored);
          const map = new Map<string, Advertisement>();
          combined.forEach(a => map.set(a.id, a));
          customAds.forEach(a => map.set(a.id, a));
          combined = Array.from(map.values());
        } catch (e) {}
      }
    }
    setAllAds(combined);
  }, [ads]);

  const activeAds = allAds.filter(a => a && a.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [secondsUntilNext, setSecondsUntilNext] = useState(defaultIntervalSeconds);

  const currentAd = activeAds[currentIndex] || null;
  const rotationSeconds = currentAd?.rotationIntervalSeconds || defaultIntervalSeconds;

  // Track impression on current active ad
  useEffect(() => {
    if (currentAd && currentAd.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: currentAd.id, type: 'impression' })
      }).catch(() => {});
    }
  }, [currentIndex, currentAd]);

  // Auto-rotation timer logic
  useEffect(() => {
    if (activeAds.length <= 1) return;

    setSecondsUntilNext(rotationSeconds);

    const countdown = setInterval(() => {
      setSecondsUntilNext((prev) => {
        if (prev <= 1) {
          triggerNextAd();
          return rotationSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, activeAds.length, rotationSeconds]);

  const triggerNextAd = () => {
    if (activeAds.length <= 1) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
      setAnimating(false);
    }, 200);
  };

  const triggerPrevAd = () => {
    if (activeAds.length <= 1) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + activeAds.length) % activeAds.length);
      setAnimating(false);
    }, 200);
  };

  if (!currentAd) return null;

  const handleClick = () => {
    if (currentAd && currentAd.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: currentAd.id, type: 'click' })
      }).catch(() => {});
    }
  };

  return (
    <div className={`relative bg-gradient-to-r from-blue-50/90 via-white to-slate-50 border border-blue-300 rounded-2xl p-4 sm:p-5 shadow-md overflow-hidden transition-all duration-300 ${className}`}>
      
      {/* TOP HEADER: AdSense Badge & Rotation Timer Info */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-blue-200">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950 shadow-xs border border-amber-500">
            Ad
          </span>
          <span className="text-xs font-extrabold text-blue-900 truncate">
            {currentAd.advertiserName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          {activeAds.length > 1 && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono border border-blue-300">
              <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Rotates in {secondsUntilNext}s</span>
            </span>
          )}
          <span className="hidden sm:inline text-[10px] font-mono text-slate-400">
            {currentIndex + 1} of {activeAds.length}
          </span>
        </div>
      </div>

      {/* AD CONTENT BODY WITH POP-UP SLIDE ANIMATION */}
      <div className={`grid grid-cols-1 sm:grid-cols-12 gap-4 items-center ${animating ? 'opacity-40 scale-98 transition-all duration-200' : 'animate-slide-up'}`}>
        
        {/* MEDIA PREVIEW (IMAGE OR VIDEO) */}
        <div className="sm:col-span-4 h-32 sm:h-36 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
          {currentAd.mediaType === 'video' && currentAd.videoUrl ? (
            <video
              src={currentAd.videoUrl}
              poster={currentAd.image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop'}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={currentAd.image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop'}
              alt={currentAd.title || 'Advertisement'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="300px"
              unoptimized={currentAd.image?.startsWith('data:')}
            />
          )}

          {currentAd.badgeText && (
            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-xs text-amber-300 font-bold text-[10px] border border-slate-700">
              {currentAd.badgeText}
            </div>
          )}
        </div>

        {/* TEXT DETAILS & ACTION BUTTON */}
        <div className="sm:col-span-8 flex flex-col justify-between space-y-2">
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {currentAd.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium line-clamp-2 mt-1 leading-relaxed">
              {currentAd.description}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <a
              href={currentAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{currentAd.ctaText || 'Learn More'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* CAROUSEL DOTS & CONTROLS */}
            {activeAds.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={triggerPrevAd}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title="Previous Ad"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 px-1">
                  {activeAds.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={triggerNextAd}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                  title="Next Ad"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
