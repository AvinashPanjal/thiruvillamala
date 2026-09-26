'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Advertisement } from '@/lib/types';

interface AdvertisementCardProps {
  ad: Advertisement;
  compact?: boolean;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ ad, compact = false }) => {
  useEffect(() => {
    if (ad && ad.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'impression' })
      }).catch(() => {});
    }
  }, [ad]);

  const handleClick = () => {
    if (ad && ad.id) {
      fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id, type: 'click' })
      }).catch(() => {});
    }
  };

  if (!ad) return null;

  // Custom Theme Colors per Admin Config
  const getThemeStyles = (theme?: string) => {
    switch (theme) {
      case 'emerald':
        return {
          cardBg: 'bg-emerald-50/70 border-emerald-200',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          titleColor: 'text-emerald-950 hover:text-emerald-700'
        };
      case 'amber':
        return {
          cardBg: 'bg-amber-50/70 border-amber-200',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white',
          titleColor: 'text-amber-950 hover:text-amber-700'
        };
      case 'purple':
        return {
          cardBg: 'bg-purple-50/70 border-purple-200',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
          titleColor: 'text-purple-950 hover:text-purple-700'
        };
      case 'dark':
        return {
          cardBg: 'bg-slate-900 border-slate-800 text-white',
          badgeBg: 'bg-slate-800 text-amber-300 border-slate-700',
          buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
          titleColor: 'text-white hover:text-blue-300'
        };
      default: // 'blue'
        return {
          cardBg: 'bg-blue-50/70 border-blue-200',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
          titleColor: 'text-slate-900 hover:text-blue-700'
        };
    }
  };

  const theme = getThemeStyles(ad.adTheme);

  return (
    <div className={`relative rounded-2xl border ${theme.cardBg} p-4 md:p-5 shadow-sm hover:shadow-md transition-all group`}>
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-1.5">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${theme.badgeBg}`}>
            Ad
          </span>
          <span className="text-xs font-bold text-slate-700">{ad.badgeText || 'Local Partner Business'}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Google AdSense Placement</span>
      </div>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'} gap-4 items-center`}>
        <div className={`${compact ? 'w-full h-36' : 'md:col-span-4 h-36 md:h-28'} relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0`}>
          <Image
            src={ad.image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop'}
            alt={ad.title || 'Ad'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 300px"
            unoptimized={true}
          />
        </div>

        <div className={`${compact ? 'w-full' : 'md:col-span-8'} space-y-1.5`}>
          <span className="text-xs font-bold text-blue-700 block">{ad.advertiserName}</span>

          <h4 className={`text-base font-extrabold leading-snug transition-colors ${theme.titleColor}`}>
            {ad.title}
          </h4>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {ad.description}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <a
              href={ad.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${theme.buttonBg}`}
            >
              <span>{ad.ctaText || 'Visit Business'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
