'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X, Info } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface StickyAnchorAdProps {
  ad: Advertisement | null;
}

export const StickyAnchorAd: React.FC<StickyAnchorAdProps> = ({ ad }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (ad && isVisible) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'impression' })
      }).catch(() => {});
    }
  }, [ad, isVisible]);

  if (!ad || !isVisible || !ad.isActive) return null;

  const handleClick = () => {
    fetch('/api/ads/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adId: ad.id, type: 'click' })
    }).catch(() => {});
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-blue-200 shadow-2xl px-4 py-2.5 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* AdSense Info Label */}
        <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-mono uppercase shrink-0">
          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
            Ad
          </span>
          <span>Google AdSense Unit</span>
        </div>

        {/* Content */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide truncate">
                {ad.advertiserName}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {ad.title}
            </h4>
            <p className="text-[11px] text-slate-600 line-clamp-1 hidden sm:block">
              {ad.description}
            </p>
          </div>
        </div>

        {/* CTA & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={ad.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>Visit</span>
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
