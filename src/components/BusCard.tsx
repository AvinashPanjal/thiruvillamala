'use client';

import React, { useState } from 'react';
import { Bus as BusIcon, ChevronDown, Clock, MapPin, Phone, Calendar, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { TimetableEntry } from '@/lib/types';
import { RouteTimeline } from './RouteTimeline';

interface BusCardProps {
  bus: TimetableEntry;
}

export const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getOperatorStyle = (op: string) => {
    if (op.toLowerCase().includes('ksrtc swift')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }
    if (op.toLowerCase().includes('ksrtc')) {
      return 'bg-rose-50 text-rose-800 border-rose-300';
    }
    return 'bg-blue-50 text-blue-800 border-blue-300';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden group">
      {/* Top Ticket Header */}
      <div className="bg-slate-50/90 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
            <BusIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {bus.busName}
              </h3>
              {bus.busNumber && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 border border-slate-300 font-bold">
                  {bus.busNumber}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              {bus.viaText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getOperatorStyle(bus.operator)}`}>
            {bus.operator}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
            {bus.busType}
          </span>
        </div>
      </div>

      {/* RailOne Main Row */}
      <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Origin Departure */}
        <div className="md:col-span-4 space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            DEPARTURE TIME
          </span>
          <div className="text-2xl md:text-3xl font-black font-mono text-blue-700 tracking-tight">
            {bus.departureTime}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{bus.originName}</span>
          </div>
        </div>

        {/* Duration & Dotted Rail Connector */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center px-2 py-2">
          <span className="text-xs font-mono font-bold text-slate-500 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            {bus.approxDuration} min ({bus.stops.length} stops)
          </span>

          <div className="w-full flex items-center gap-2 my-1">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            <div className="h-[2px] flex-1 border-t-2 border-dashed border-slate-300 relative">
              {bus.isDirect && (
                <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 px-2 py-0.5 rounded bg-blue-100 border border-blue-300 text-[9px] font-extrabold text-blue-800 uppercase tracking-wider">
                  Express Direct
                </span>
              )}
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          </div>

          <span className="text-[11px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {bus.operatingDays}
          </span>
        </div>

        {/* Destination Arrival */}
        <div className="md:col-span-4 space-y-1 md:text-right">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            APPROX ARRIVAL
          </span>
          <div className="text-2xl md:text-3xl font-black font-mono text-amber-600 tracking-tight">
            {bus.arrivalTime}
          </div>
          <div className="flex items-center md:justify-end gap-1.5 text-sm font-extrabold text-slate-900">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{bus.destName}</span>
          </div>
        </div>
      </div>

      {/* Ticket Footer Controls */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        {bus.phone ? (
          <a
            href={`tel:${bus.phone}`}
            className="text-slate-700 hover:text-blue-700 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Operator Contact: <strong className="font-mono text-slate-900">{bus.phone}</strong></span>
          </a>
        ) : (
          <span className="text-slate-500 italic">Daily Schedule Service</span>
        )}

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-blue-700 border border-slate-300 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <span>{isExpanded ? 'Hide Stop Schedule' : 'View Stop Timings'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Route Timeline */}
      {isExpanded && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-200 animate-in fade-in duration-200">
          <RouteTimeline stops={bus.stops} originName={bus.originName} destName={bus.destName} />
        </div>
      )}
    </div>
  );
};
