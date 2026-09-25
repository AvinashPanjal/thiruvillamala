'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Sunset, Moon, Sunrise, Sparkles, MapPin, Compass, Trees } from 'lucide-react';
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
      icon: <Sunrise className="w-5 h-5 text-amber-600" />,
      greeting: 'Good Morning',
      malayalamGreeting: 'സുപ്രഭാതം',
      subtitle: 'Where are you heading today around Thiruvilwamala village?',
      badge: 'Morning Dew over Nila River • 26°C',
      tagColor: 'bg-blue-600 text-white',
      isDark: false
    },
    afternoon: {
      bgClass: 'hero-afternoon',
      icon: <Sun className="w-5 h-5 text-yellow-600" />,
      greeting: 'Good Afternoon',
      malayalamGreeting: 'ഉച്ച നമസ്കാരം',
      subtitle: 'Check sunlit daytime bus schedules, local town connects & routes.',
      badge: 'Vibrant Village Palms • 31°C',
      tagColor: 'bg-blue-600 text-white',
      isDark: false
    },
    evening: {
      bgClass: 'hero-evening',
      icon: <Sunset className="w-5 h-5 text-orange-600" />,
      greeting: 'Good Evening',
      malayalamGreeting: 'സന്ധ്യാവന്ദനം',
      subtitle: 'Find your twilight return bus to Thiruvilwamala & nearby towns.',
      badge: 'Golden Hour Dusk over Riverbank • 28°C',
      tagColor: 'bg-amber-600 text-white',
      isDark: false
    },
    night: {
      bgClass: 'hero-night',
      icon: <Moon className="w-5 h-5 text-indigo-300" />,
      greeting: 'Good Night',
      malayalamGreeting: 'ശുഭരാത്രി',
      subtitle: 'Plan tomorrow’s travel schedule and early morning village trips.',
      badge: 'Peaceful Countryside Night • 24°C',
      tagColor: 'bg-indigo-600 text-white',
      isDark: true
    }
  }[period];

  return (
    <section className={`relative min-h-[85vh] flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 ${atmosphere.bgClass} transition-all duration-700`}>
      <div className="relative max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Time-based Village Greeting & Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Time Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-300 shadow-md">
            <span className="text-[10px] uppercase font-extrabold text-slate-600 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Time Vibe:
            </span>
            {(['morning', 'afternoon', 'evening', 'night'] as TimePeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodSwitch(p)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold capitalize transition-all cursor-pointer ${
                  period === p
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-300 text-xs font-bold text-slate-900 shadow-xs">
            {atmosphere.icon}
            <span>{atmosphere.badge}</span>
            <span className="text-slate-500 font-normal">• Thiruvilwamala Village</span>
          </div>

          <div className="space-y-2">
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${atmosphere.isDark ? 'text-white' : 'text-slate-900'}`}>
              {atmosphere.greeting},{' '}
              <span className="text-blue-600 block font-serif italic font-normal">
                {atmosphere.malayalamGreeting}
              </span>
            </h1>
            <p className={`text-lg sm:text-xl font-bold max-w-xl leading-relaxed ${atmosphere.isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              &quot;Everything you need to know around Thiruvilwamala.&quot;
            </p>
            <p className={`text-sm font-medium ${atmosphere.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {atmosphere.subtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 shadow-xs">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Thiruvilwamala Village Hub</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 shadow-xs">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>30+ Regional Bus Stops</span>
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
