import React from 'react';
import { Metadata } from 'next';
import { getStops, searchBuses, getAds } from '@/lib/data-store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BusSearch } from '@/components/BusSearch';
import { BusCard } from '@/components/BusCard';
import { AdvertisementCard } from '@/components/AdvertisementCard';
import { AdSenseNativeUnit } from '@/components/AdSenseNativeUnit';
import { StickyAnchorAd } from '@/components/StickyAnchorAd';
import { SearchParams } from '@/lib/types';
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BusSearchPageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ searchParams }: BusSearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const from = params.from || 'Thiruvilwamala';
  const to = params.to || 'Thrissur';

  return {
    title: `Buses from ${from} to ${to} | Thiruvilwamala Timetable`,
    description: `View complete bus schedules, departure times, and stop timelines from ${from} to ${to} around Thiruvilwamala, Kerala.`,
  };
}

export default async function BusSearchPage({ searchParams }: BusSearchPageProps) {
  const params = await searchParams;
  const from = params.from || 'Thiruvilwamala';
  const to = params.to || 'Thrissur';
  const timeFilter = params.timeFilter || 'all';
  const operator = params.operator || 'all';
  const busType = params.busType || 'all';
  const sortBy = params.sortBy || 'earliest';

  const stops = await getStops();

  const buses = await searchBuses({
    from,
    to,
    timeFilter,
    operator,
    busType,
    sortBy
  });

  const searchAds = await getAds('search_results');
  const nativeAds = await getAds('native_in_feed');
  const homepageAds = await getAds('homepage');
  const anchorAds = await getAds('sticky_anchor');
  const interstitialAds = await getAds('interstitial_loading');

  const allInPageAds = [...searchAds, ...nativeAds, ...homepageAds, ...anchorAds].filter(a => a && a.isActive);
  const searchAd = searchAds[0] || allInPageAds[0] || null;
  const interstitialAd = interstitialAds[0] || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-24">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Search Component */}
        <div className="mb-8">
          <BusSearch
            stops={stops}
            initialFrom={from}
            initialTo={to}
            initialTimeFilter={timeFilter}
            interstitialAd={interstitialAd}
          />
        </div>

        {/* Search Header Banner - Prioritized Auto-Rotating In-Page Ad */}
        {allInPageAds.length > 0 && (
          <div className="mb-6">
            <AdSenseNativeUnit ads={allInPageAds} />
          </div>
        )}

        {/* Results Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Buses: <span className="text-blue-700">{from}</span> → <span className="text-amber-700">{to}</span>
              </h1>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              Found <strong className="text-slate-900 font-mono">{buses.length} available bus timetables</strong> for your route
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <form action="/bus-search" method="GET" className="flex items-center gap-2 flex-wrap">
              <input type="hidden" name="from" value={from} />
              <input type="hidden" name="to" value={to} />
              <input type="hidden" name="timeFilter" value={timeFilter} />

              <select
                name="operator"
                defaultValue={operator}
                aria-label="Filter by operator"
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Operators</option>
                <option value="ksrtc">KSRTC / Swift Only</option>
                <option value="private">Private Buses Only</option>
              </select>

              <select
                name="sortBy"
                defaultValue={sortBy}
                aria-label="Sort buses by"
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="earliest">Earliest Departure</option>
                <option value="latest">Latest Departure</option>
                <option value="duration">Shortest Duration</option>
              </select>

              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Filter
              </button>
            </form>
          </div>
        </div>

        {/* Bus Results List with In-Feed AdSense Native Unit */}
        {buses.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4 max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-amber-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">No Buses Found for Selection</h3>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find direct timetables matching &quot;{from}&quot; to &quot;{to}&quot; with active filters. Try searching for Thiruvilwamala to Thrissur or Shoranur.
            </p>
            <div className="pt-2">
              <Link
                href="/bus-search?from=Thiruvilwamala&to=Thrissur"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset to Thiruvilwamala → Thrissur</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {buses.map((bus, idx) => (
              <React.Fragment key={bus.id}>
                <BusCard bus={bus} />
                {/* Insert Native AdSense In-Feed Rotating Ad after 2nd item */}
                {idx === 1 && allInPageAds.length > 0 && (
                  <AdSenseNativeUnit ads={allInPageAds} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </main>

      {/* Google AdSense Style Sticky Bottom Anchor Banner */}
      <StickyAnchorAd ads={allInPageAds} />

      <Footer />
    </div>
  );
}
