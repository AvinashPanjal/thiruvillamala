'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, Search, Clock, Sparkles, Navigation } from 'lucide-react';
import { LocationSelector } from './LocationSelector';
import { SearchLoadingModal } from './SearchLoadingModal';
import { Stop, Advertisement } from '@/lib/types';

interface BusSearchProps {
  stops: Stop[];
  initialFrom?: string;
  initialTo?: string;
  initialTimeFilter?: string;
  interstitialAd?: Advertisement | null;
  className?: string;
}

export const BusSearch: React.FC<BusSearchProps> = ({
  stops,
  initialFrom = 'Thiruvilwamala',
  initialTo = 'Thrissur',
  initialTimeFilter = 'all',
  interstitialAd,
  className = ''
}) => {
  const router = useRouter();
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [timeFilter, setTimeFilter] = useState(initialTimeFilter);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const popularDestinations = ['Thrissur', 'Shoranur', 'Ottapalam', 'Chelakkara', 'Wadakkanchery', 'Guruvayur', 'Palakkad'];

  const handleSwap = () => {
    setIsSwapping(true);
    setFrom(to);
    setTo(from);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingModal(true);
  };

  const handleLoadingComplete = () => {
    setShowLoadingModal(false);
    const query = new URLSearchParams();
    if (from) query.set('from', from);
    if (to) query.set('to', to);
    if (timeFilter && timeFilter !== 'all') query.set('timeFilter', timeFilter);

    router.push(`/bus-search?${query.toString()}`);
  };

  return (
    <>
      <div className={`bg-white rounded-3xl p-4 sm:p-7 shadow-xl border border-slate-200 relative overflow-hidden ${className}`}>
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Bus Timetable &amp; Route Search
            </h2>
          </div>
          <div className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <Navigation className="w-3 h-3 text-blue-600" />
            <span>Mobile Transit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* FROM - SWAP - TO Mobile Optimized Stack */}
          <div className="flex flex-col md:flex-row items-center gap-2.5 sm:gap-3 relative">
            <LocationSelector
              label="Origin (From)"
              value={from}
              onChange={setFrom}
              stops={stops}
              placeholder="Starting location..."
              popularLocations={['Thiruvilwamala', 'Thrissur', 'Shoranur']}
              id="search-from"
            />

            {/* Mobile Swap Button */}
            <div className="flex items-center justify-center my-[-10px] md:my-0 z-10 md:pt-6">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Origin and Destination"
                aria-label="Swap Locations"
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none shadow-md flex items-center justify-center transition-all duration-300 transform cursor-pointer ${
                  isSwapping ? 'rotate-180 scale-110 bg-blue-600 text-white' : 'hover:scale-105 active:scale-95'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <LocationSelector
              label="Destination (To)"
              value={to}
              onChange={setTo}
              stops={stops}
              placeholder="Destination town..."
              popularLocations={popularDestinations}
              id="search-to"
            />
          </div>

          {/* Time Window Touch Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Departure Window
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">Touch to filter</span>
            </div>

            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              {[
                { id: 'all', label: 'All', icon: '🌅' },
                { id: 'morning', label: 'Morning', icon: '☀️' },
                { id: 'afternoon', label: 'Noon', icon: '🌤️' },
                { id: 'evening', label: 'Eve', icon: '🌆' },
                { id: 'night', label: 'Night', icon: '🌙' },
              ].map(slot => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setTimeFilter(slot.id)}
                  className={`py-2 px-0.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                    timeFilter === slot.id
                      ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="text-sm">{slot.icon}</span>
                  <span className="text-[10px] font-extrabold leading-none mt-0.5">{slot.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Search Button (56px high touch target) */}
          <button
            type="submit"
            className="w-full h-14 sm:h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base sm:text-lg tracking-wide shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Search Available Buses</span>
          </button>
        </form>

        {/* SWIPABLE POPULAR DESTINATIONS CHIPS FOR MOBILE */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Popular Towns (Swipe →):
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {popularDestinations.map(dest => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setFrom('Thiruvilwamala');
                  setTo(dest);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                  to.toLowerCase() === dest.toLowerCase()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <span>{dest}</span>
                <span className="text-[10px] opacity-75">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FULL-SCREEN SEARCH INTERSTITIAL AD MODAL */}
      <SearchLoadingModal
        isOpen={showLoadingModal}
        onComplete={handleLoadingComplete}
        from={from}
        to={to}
        ad={interstitialAd}
      />
    </>
  );
};
