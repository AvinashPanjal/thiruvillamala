'use client';

import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { RouteStopDetail } from '@/lib/types';

interface RouteTimelineProps {
  stops: RouteStopDetail[];
  originName: string;
  destName: string;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ stops, originName, destName }) => {
  if (!stops || stops.length === 0) {
    return <div className="text-xs text-slate-500 p-2">No intermediate stops detailed.</div>;
  }

  return (
    <div className="py-3 px-4 bg-white rounded-2xl border border-slate-200 text-slate-800 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          Complete Route &amp; Stop Schedule ({stops.length} Stops)
        </span>
        <span className="text-[11px] text-slate-500 font-semibold">Timings relative to departure</span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-300">
        {stops.map((stop, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === stops.length - 1;

          return (
            <div key={`${stop.stopId}-${idx}`} className="relative flex items-center justify-between group">
              <div
                className={`absolute -left-[18px] w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 ${
                  isFirst
                    ? 'bg-blue-600 border-blue-200 ring-4 ring-blue-100'
                    : isLast
                    ? 'bg-amber-500 border-amber-200 ring-4 ring-amber-100'
                    : 'bg-white border-blue-500'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isFirst || isLast ? 'bg-white' : 'bg-blue-600'}`} />
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${
                    isFirst || isLast ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'
                  }`}
                >
                  {stop.stopName}
                </span>
                {isFirst && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800">
                    Origin
                  </span>
                )}
                {isLast && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900">
                    Destination
                  </span>
                )}
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-mono font-bold ${
                    isFirst || isLast ? 'text-blue-700' : 'text-slate-500'
                  }`}
                >
                  {stop.arrivalTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
