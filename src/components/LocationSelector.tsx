'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, ChevronDown, Check, Star } from 'lucide-react';
import { Stop } from '@/lib/types';

interface LocationSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  stops: Stop[];
  placeholder?: string;
  popularLocations?: string[];
  id?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  value,
  onChange,
  stops,
  placeholder = 'Select location...',
  popularLocations = [],
  id = 'location-select'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStops = stops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <label htmlFor={id} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-blue-600" />
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-13 px-4 rounded-xl bg-white border border-slate-300 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-left text-slate-900 flex items-center justify-between shadow-sm transition-all group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-bold text-sm truncate text-slate-900">
            {value || <span className="text-slate-400 font-normal">{placeholder}</span>}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in duration-150">
          <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type destination or town..."
              className="w-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
              autoFocus
            />
          </div>

          {popularLocations.length > 0 && !searchTerm && (
            <div className="p-2.5 border-b border-slate-100 bg-slate-50/50">
              <p className="text-[10px] uppercase font-extrabold text-slate-500 px-2 mb-1.5 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500" /> Major Hubs:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {popularLocations.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      onChange(loc);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      value.toLowerCase() === loc.toLowerCase()
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto py-1 divide-y divide-slate-100">
            {filteredStops.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching stops found for &quot;{searchTerm}&quot;
              </div>
            ) : (
              filteredStops.map((stop) => {
                const isSelected = value.toLowerCase() === stop.name.toLowerCase();
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => {
                      onChange(stop.name);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stop.name}</span>
                      {stop.isMajor && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                          Major Hub
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{stop.district}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
