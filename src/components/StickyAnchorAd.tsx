'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X, RefreshCw } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface StickyAnchorAdProps {
  ad?: Advertisement | null;
  ads?: Advertisement[];
}

export const StickyAnchorAd: React.FC<StickyAnchorAdProps> = ({ ad, ads = [] }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Combine passed ads or single ad
  const activeAdsList = (ads.length > 0 ? ads : ad ? [ad] : []).filter(a => a && a.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAd = activeAdsList[currentIndex] || null;
  const rotationSeconds = currentAd?.rotationIntervalSeconds || 5;

  useEffect(() => {
    if (currentAd && isVisible) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: currentAd.id, type: 'impression' })
      }).catch(() => {});
    }
  }, [currentIndex, currentAd, isVisible]);

  // Auto rotate sticky anchor ad if multiple active ads exist
  useEffect(() => {
    if (activeAdsList.length <= 1 || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAdsList.length);
    }, rotationSeconds * 1000);

    return () => clearInterval(timer);
  }, [activeAdsList.length, rotationSeconds, isVisible]);

  if (!currentAd || !isVisible) return null;

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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-blue-200 shadow-2xl px-4 py-2.5 animate-slide-up transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* AdSense Info Label */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-500 font-mono uppercase shrink-0">
          <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black border border-amber-500">
            Ad
          </span>
          <span>Google AdSense Unit</span>
          {activeAdsList.length > 1 && (
            <span className="text-[9px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              <span>{currentIndex + 1}/{activeAdsList.length}</span>
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
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
                alt={currentAd.title || 'Ad'}
                fill
                className="object-cover"
                sizes="60px"
                unoptimized={currentAd.image?.startsWith('data:')}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide truncate">
                {currentAd.advertiserName}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {currentAd.title}
            </h4>
            <p className="text-[11px] text-slate-600 line-clamp-1 hidden sm:block">
              {currentAd.description}
            </p>
          </div>
        </div>

        {/* CTA & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={currentAd.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>{currentAd.ctaText || 'Visit'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close Advertisement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
