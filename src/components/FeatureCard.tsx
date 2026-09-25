'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export interface LocalFeatureItem {
  id: string;
  title: string;
  malayalamTitle: string;
  description: string;
  category: string;
  iconName: string;
  status: 'available' | 'coming_soon';
  previewDetails: string[];
}

interface FeatureCardProps {
  feature: LocalFeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const [showModal, setShowModal] = useState(false);

  const isAvailable = feature.status === 'available';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 shadow-sm cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase font-extrabold text-slate-500 tracking-wider">
              {feature.category}
            </span>
            {isAvailable ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Live Now
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" /> Coming Soon
              </span>
            )}
          </div>

          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center justify-between">
            <span>{feature.title}</span>
          </h3>
          <p className="text-xs text-blue-700 font-serif italic mb-2">
            {feature.malayalamTitle}
          </p>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {feature.description}
          </p>
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
          <span>{isAvailable ? 'Explore Feature' : 'Preview Roadmap'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  {feature.category} Module
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.malayalamTitle}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {feature.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Feature Roadmap:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {feature.previewDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
