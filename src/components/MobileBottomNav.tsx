'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bus, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide on admin pages to leave full screen for admin panel
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/bus-search', label: 'Buses', icon: Bus },
    { href: '/#explore', label: 'Explore', icon: Compass },
    { href: '/admin/login', label: 'Admin Desk', icon: ShieldCheck },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-2xl flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-blue-600 font-extrabold scale-105'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
