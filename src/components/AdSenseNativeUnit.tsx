'use client';

import React from 'react';
import { Advertisement } from '@/lib/types';
import { RotatingAdBanner } from './RotatingAdBanner';

interface AdSenseNativeUnitProps {
  ad?: Advertisement | null;
  ads?: Advertisement[];
}

export const AdSenseNativeUnit: React.FC<AdSenseNativeUnitProps> = ({ ad, ads = [] }) => {
  const activeAds = (ads.length > 0 ? ads : ad ? [ad] : []).filter(a => a && a.isActive);

  if (activeAds.length === 0) return null;

  return (
    <div className="my-6">
      <RotatingAdBanner ads={activeAds} />
    </div>
  );
};
