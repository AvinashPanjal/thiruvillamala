'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Compass, Train } from 'lucide-react';

export const LocalInfoSection: React.FC = () => {
  const heritageItems = [
    {
      title: 'Sree Vilwadrinath Temple',
      malayalamTitle: 'ശ്രീ വില്വാദ്രിനാഥ ക്ഷേത്രം',
      description: 'Ancient hill-top temple dedicated to Lord Rama & Lakshmana overlooking the river Nila. Celebrated for Ekadasi festival and sacred Punarjani Guha cave.',
      image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?q=80&w=800&auto=format&fit=crop',
      badge: 'Heritage & Faith'
    },
    {
      title: 'Ivarmadhom Krishna Temple',
      malayalamTitle: 'ഇവറുമഠം കൃഷ്ണക്ഷേത്രം',
      description: 'Venerated temple on the banks of Bharathapuzha river, famous across South India for last rites rituals (Pithru Tharpanam) believed to have Pandava heritage.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
      badge: 'Holy Riverbank'
    },
    {
      title: 'Kuthampully Handloom Village',
      malayalamTitle: 'കുത്താമ്പുള്ളി നെയ്ത്തുഗ്രാമം',
      description: 'Famous traditional weavers cooperative just 3 km from Thiruvilwamala town. Renowned worldwide for woven Kasavu sarees and traditional dhotis.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      badge: 'GI Tag Craft'
    }
  ];

  return (
    <section id="explore" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 border border-blue-200 mb-3">
          <Compass className="w-3.5 h-3.5 text-blue-600" /> Discover Thiruvilwamala
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Heritage, Sacred Places &amp; Local Life
        </h2>
        <p className="text-base text-slate-600 font-medium mt-2">
          Nestled on the northern banks of river Bharathapuzha (Nila) in Thrissur district, Kerala.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {heritageItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/90 text-amber-900 border border-amber-300 backdrop-blur-md shadow-xs">
                {item.badge}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-blue-700 font-serif italic font-bold">
                {item.malayalamTitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="px-5 pb-5 pt-2 text-xs font-semibold text-slate-500 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center gap-1 text-blue-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Thiruvilwamala Area
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Accessible by Bus</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-blue-900 border border-blue-800 p-6 md:p-8 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Train className="w-4 h-4" /> Transit &amp; Hub Distances
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Connecting Thiruvilwamala to Railway &amp; Air Terminals
            </h3>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
              Frequent local buses link Thiruvilwamala to Shoranur Junction (8 km) for interstate trains, Thrissur Railway Hub (35 km), and Palakkad Junction (42 km).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0">
            <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 text-center">
              <span className="text-[10px] uppercase text-blue-200 font-bold block">Shoranur JN</span>
              <span className="text-lg font-black text-amber-300 font-mono">8 KM</span>
              <span className="text-[10px] text-blue-300 block">~15 mins bus</span>
            </div>

            <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 text-center">
              <span className="text-[10px] uppercase text-blue-200 font-bold block">Thrissur City</span>
              <span className="text-lg font-black text-emerald-300 font-mono">35 KM</span>
              <span className="text-[10px] text-blue-300 block">~80 mins bus</span>
            </div>

            <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase text-blue-200 font-bold block">Cochin Airport</span>
              <span className="text-lg font-black text-sky-300 font-mono">75 KM</span>
              <span className="text-[10px] text-blue-300 block">~2 hours road</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
