'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface AdSenseNativeUnitProps {
  ad: Advertisement;
}

export const AdSenseNativeUnit: React.FC<AdSenseNativeUnitProps> = ({ ad }) => {
  useEffect(() => {
    if (ad && ad.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'impression' })
      }).catch(() => {});
    }
  }, [ad]);

  if (!ad || !ad.isActive) return null;

  const handleClick = () => {
    fetch('/api/ads/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adId: ad.id, type: 'click' })
    }).catch(() => {});
  };

  return (
    <div className="bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all my-4">
      {/* Top AdSense Badge Header */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-blue-100">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
            Ad
          </span>
          <span className="text-[11px] font-semibold text-slate-500">Sponsored Unit • {ad.advertiserName}</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Google AdSense Native</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-3 h-28 relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>

        <div className="sm:col-span-9 space-y-1.5">
          <h4 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">
            {ad.title}
          </h4>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {ad.description}
          </p>

          <div className="pt-2">
            <a
              href={ad.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>Learn More / Open</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
