'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Sunset, Moon, Sunrise, Sparkles, MapPin, Compass } from 'lucide-react';
import { TimePeriod, Stop, Advertisement } from '@/lib/types';
import { BusSearch } from './BusSearch';

interface TimeBasedHeroProps {
  stops: Stop[];
  interstitialAd?: Advertisement | null;
  initialTimePeriod?: TimePeriod;
  onTimeChange?: (period: TimePeriod) => void;
}

export const TimeBasedHero: React.FC<TimeBasedHeroProps> = ({ stops, interstitialAd, initialTimePeriod, onTimeChange }) => {
  const [period, setPeriod] = useState<TimePeriod>('morning');

  useEffect(() => {
    if (initialTimePeriod) {
      setPeriod(initialTimePeriod);
      return;
    }

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setPeriod('morning');
    } else if (hour >= 11 && hour < 16) {
      setPeriod('afternoon');
    } else if (hour >= 16 && hour < 20) {
      setPeriod('evening');
    } else {
      setPeriod('night');
    }
  }, [initialTimePeriod]);

  const handlePeriodSwitch = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
    if (onTimeChange) {
      onTimeChange(newPeriod);
    }
  };

  const atmosphere = {
    morning: {
      bgClass: 'hero-morning',
      icon: <Sunrise className="w-5 h-5 text-amber-300" />,
      greeting: 'Good Morning',
      malayalamGreeting: 'സുപ്രഭാതം',
      subtitle: 'Where are you heading today around Thiruvilwamala?',
      badge: 'Fresh Morning Dew • 26°C',
    },
    afternoon: {
      bgClass: 'hero-afternoon',
      icon: <Sun className="w-5 h-5 text-yellow-300" />,
      greeting: 'Good Afternoon',
      malayalamGreeting: 'ഉച്ച നമസ്കാരം',
      subtitle: 'Check daytime schedules, local connecting buses & routes.',
      badge: 'Radiant Daylight • 31°C',
    },
    evening: {
      bgClass: 'hero-evening',
      icon: <Sunset className="w-5 h-5 text-orange-400" />,
      greeting: 'Good Evening',
      malayalamGreeting: 'സന്ധ്യാവന്ദനം',
      subtitle: 'Find your evening return bus to Thiruvilwamala & nearby towns.',
      badge: 'Golden Sunset • 28°C',
    },
    night: {
      bgClass: 'hero-night',
      icon: <Moon className="w-5 h-5 text-indigo-300" />,
      greeting: 'Good Night',
      malayalamGreeting: 'ശുഭരാത്രി',
      subtitle: 'Plan tomorrow’s travel schedule and early morning trips.',
      badge: 'Peaceful Night • 24°C',
    }
  }[period];

  return (
    <section className={`relative min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ${atmosphere.bgClass} transition-all duration-700`}>
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

      <div className="relative max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Time-based Greeting & Hero Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Time Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Mode:
            </span>
            {(['morning', 'afternoon', 'evening', 'night'] as TimePeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodSwitch(p)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  period === p
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">
            {atmosphere.icon}
            <span className="text-white font-bold">{atmosphere.badge}</span>
            <span className="text-slate-400">• Thiruvilwamala, Thrissur</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {atmosphere.greeting},{' '}
              <span className="text-emerald-400 block font-serif italic font-normal">
                {atmosphere.malayalamGreeting}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 font-bold max-w-xl leading-relaxed">
              &quot;Everything you need to know around Thiruvilwamala.&quot;
            </p>
            <p className="text-sm text-slate-300 font-normal">
              {atmosphere.subtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>30+ Regional Bus Stops</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>RailOne Transit Timetables</span>
            </div>
          </div>
        </div>

        {/* Right Side: BUS SEARCH CARD */}
        <div className="lg:col-span-6 w-full">
          <BusSearch stops={stops} interstitialAd={interstitialAd} initialTimeFilter={period} />
        </div>
      </div>
    </section>
  );
};
