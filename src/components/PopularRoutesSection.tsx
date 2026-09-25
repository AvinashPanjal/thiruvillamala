'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, ArrowRight, Clock } from 'lucide-react';

export const PopularRoutesSection: React.FC = () => {
  const routes = [
    {
      from: 'Thiruvilwamala',
      to: 'Thrissur',
      via: 'via Chelakkara & Wadakkanchery',
      duration: '80 mins',
      busesCount: '18 Daily Buses',
      highlight: 'Frequency: Every 20 mins',
      badge: 'Most Popular'
    },
    {
      from: 'Thiruvilwamala',
      to: 'Ottapalam',
      via: 'via Pampady & Shoranur',
      duration: '45 mins',
      busesCount: '22 Daily Buses',
      highlight: 'Direct Connecting Bus',
      badge: 'High Frequency'
    },
    {
      from: 'Thiruvilwamala',
      to: 'Shoranur Junction',
      via: 'via Pampady',
      duration: '25 mins',
      busesCount: '14 Daily Buses',
      highlight: 'Railway Station Connection',
      badge: 'Train Transfer'
    },
    {
      from: 'Thiruvilwamala',
      to: 'Palakkad',
      via: 'via Lakkidi & Pathiripala',
      duration: '75 mins',
      busesCount: '10 Daily Buses',
      highlight: 'KSRTC Swift & Fast Passenger',
      badge: 'Inter-District'
    },
    {
      from: 'Thiruvilwamala',
      to: 'Guruvayur',
      via: 'via Kunnamkulam',
      duration: '90 mins',
      busesCount: '6 Direct Buses',
      highlight: 'Pilgrim Express Service',
      badge: 'Temple Route'
    },
    {
      from: 'Thiruvilwamala',
      to: 'Chelakkara',
      via: 'Direct Local',
      duration: '20 mins',
      busesCount: '28 Daily Buses',
      highlight: 'Shuttle Every 15 mins',
      badge: 'Local Shuttle'
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 flex items-center gap-1.5 mb-1">
            <Bus className="w-4 h-4" /> Direct Timetables
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Popular Bus Routes from Thiruvilwamala
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Click any popular destination to immediately inspect full departure schedules and intermediate stop timings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {routes.map((r, idx) => (
          <Link
            key={idx}
            href={`/bus-search?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 shadow-sm group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                  {r.badge}
                </span>
                <span className="text-xs font-mono font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {r.duration}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-black text-slate-900">{r.from}</span>
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                <span className="text-base font-black text-slate-900">{r.to}</span>
              </div>

              <p className="text-xs text-slate-500 font-semibold mb-3">{r.via}</p>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between font-semibold">
                <span>{r.busesCount}</span>
                <span className="text-blue-700 font-bold">{r.highlight}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
              <span>View Available Buses</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
