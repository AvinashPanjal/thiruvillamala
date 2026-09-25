'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bus,
  Megaphone,
  Route as RouteIcon,
  MapPin,
  Clock,
  BarChart3,
  Plus,
  Trash2,
  Eye,
  MousePointerClick,
  Percent,
  CheckCircle2,
  XCircle,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Timer,
  Lock,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import {
  getAdminStats,
  getAds,
  getBuses,
  getRoutes,
  getStops,
  getTimetables,
  addAd,
  updateAd,
  deleteAd,
  addBus,
  deleteBus,
  addTimetable,
  deleteTimetable
} from '@/lib/data-store';
import { Advertisement, Bus as BusType, Route, Stop, TimetableEntry } from '@/lib/types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'ads' | 'buses' | 'routes' | 'timetables'>('analytics');

  const [stats, setStats] = useState<any>(null);
  const [adsList, setAdsList] = useState<Advertisement[]>([]);
  const [busesList, setBusesList] = useState<BusType[]>([]);
  const [routesList, setRoutesList] = useState<Route[]>([]);
  const [stopsList, setStopsList] = useState<Stop[]>([]);
  const [timetablesList, setTimetablesList] = useState<TimetableEntry[]>([]);

  const [showAdModal, setShowAdModal] = useState(false);
  const [showBusModal, setShowBusModal] = useState(false);
  const [showTimetableModal, setShowTimetableModal] = useState(false);

  // New Ad Form State with Full Admin Timing & Video Control
  const [adForm, setAdForm] = useState({
    advertiserName: '',
    title: '',
    description: '',
    image: '',
    mediaType: 'image' as 'image' | 'video' | 'poster',
    videoUrl: '',
    targetUrl: '',
    placement: 'interstitial_loading' as any,
    adFormat: 'interstitial_loading' as any,
    displaySeconds: 8,
    skipAfterSeconds: 5,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    badgeText: 'Featured Local Merchant'
  });

  const [busForm, setBusForm] = useState({
    name: '',
    busNumber: '',
    operator: 'Private' as any,
    busType: 'Fast Passenger' as any,
    operatingDays: 'Daily',
    isDirect: false,
    phone: ''
  });

  const [ttForm, setTtForm] = useState({
    busId: '',
    routeId: '',
    departureTime: '07:30 AM',
    arrivalTime: '08:50 AM',
    direction: 'OUTBOUND' as any,
  });

  const loadData = async () => {
    const s = await getAdminStats();
    const a = await getAds();
    const b = await getBuses();
    const r = await getRoutes();
    const st = await getStops();
    const tt = await getTimetables();

    setStats(s);
    setAdsList(a);
    setBusesList(b);
    setRoutesList(r);
    setStopsList(st);
    setTimetablesList(tt);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAd({
      ...adForm,
      displaySeconds: Number(adForm.displaySeconds) || 8,
      skipAfterSeconds: Number(adForm.skipAfterSeconds) || 5
    });
    setShowAdModal(false);
    setAdForm({
      advertiserName: '',
      title: '',
      description: '',
      image: '',
      mediaType: 'image',
      videoUrl: '',
      targetUrl: '',
      placement: 'interstitial_loading',
      adFormat: 'interstitial_loading',
      displaySeconds: 8,
      skipAfterSeconds: 5,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      isActive: true,
      badgeText: 'Featured Local Merchant'
    });
    await loadData();
  };

  const handleToggleAdStatus = async (id: string, currentStatus: boolean) => {
    await updateAd(id, { isActive: !currentStatus });
    await loadData();
  };

  const handleUpdateAdTiming = async (id: string, field: 'displaySeconds' | 'skipAfterSeconds', val: number) => {
    await updateAd(id, { [field]: val });
    await loadData();
  };

  const handleDeleteAd = async (id: string) => {
    if (confirm('Delete this advertisement campaign?')) {
      await deleteAd(id);
      await loadData();
    }
  };

  const handleCreateBus = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBus(busForm);
    setShowBusModal(false);
    await loadData();
  };

  const handleDeleteBus = async (id: string) => {
    if (confirm('Delete this bus and associated timetables?')) {
      await deleteBus(id);
      await loadData();
    }
  };

  const handleCreateTimetable = async (e: React.FormEvent) => {
    e.preventDefault();
    const bus = busesList.find(b => b.id === ttForm.busId);
    const route = routesList.find(r => r.id === ttForm.routeId);

    if (!bus || !route) return;

    await addTimetable({
      busId: bus.id,
      busName: bus.name,
      busNumber: bus.busNumber,
      operator: bus.operator,
      busType: bus.busType,
      operatingDays: bus.operatingDays,
      routeId: route.id,
      routeName: route.name,
      originName: route.originName,
      destName: route.destName,
      viaText: route.viaText,
      departureTime: ttForm.departureTime,
      arrivalTime: ttForm.arrivalTime,
      direction: ttForm.direction,
      approxDuration: route.approxDuration,
      isDirect: bus.isDirect,
      phone: bus.phone,
      stops: route.stops
    });

    setShowTimetableModal(false);
    await loadData();
  };

  const handleDeleteTimetable = async (id: string) => {
    if (confirm('Delete schedule?')) {
      await deleteTimetable(id);
      await loadData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black">
              <Bus className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight">
              Thiruvilwamala<span className="text-blue-400"> Admin Control</span>
            </span>
          </Link>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
            Ad Timing &amp; Video Media Desk
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>View Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/login"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-500/30 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Admin Control Modules
            </p>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'ads'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                <span>Full-Screen Ad Timings ({adsList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('buses')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'buses'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4" />
                <span>Buses ({busesList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('routes')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'routes'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <RouteIcon className="w-4 h-4" />
                <span>Routes ({routesList.length}) &amp; Stops ({stopsList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('timetables')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'timetables'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Timetables ({timetablesList.length})</span>
              </div>
            </button>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-white">Platform Ad Analytics &amp; Impressions</h2>
                <p className="text-xs text-slate-400">Track full-screen video/poster ad views and click metrics</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Ad Impressions</span>
                    <Eye className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{stats?.totalImpressions || 0}</div>
                  <p className="text-[11px] text-emerald-400 font-medium">Recorded views</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Ad Clicks</span>
                    <MousePointerClick className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{stats?.totalClicks || 0}</div>
                  <p className="text-[11px] text-amber-400 font-medium">Website redirects</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Avg Click-Through Rate</span>
                    <Percent className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{stats?.ctr || '0%'}</div>
                  <p className="text-[11px] text-sky-400 font-mono">CTR % performance</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Campaigns</span>
                    <Megaphone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{stats?.activeAds || 0} / {stats?.totalAds || 0}</div>
                  <p className="text-[11px] text-purple-400 font-medium">Running ads</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Full-Screen Ad Timings &amp; Video Media Controls</h2>
                  <p className="text-xs text-slate-400">Set mandatory skip lock timers (e.g. 5s) and video poster media</p>
                </div>

                <button
                  onClick={() => setShowAdModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Ad Campaign</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Advertiser &amp; Title</th>
                        <th className="p-3.5">Format &amp; Media</th>
                        <th className="p-3.5">Skip Lock Timer</th>
                        <th className="p-3.5">Total Display Time</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {adsList.map((ad) => (
                        <tr key={ad.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-white">{ad.title}</div>
                            <div className="text-[11px] text-blue-400">{ad.advertiserName}</div>
                          </td>
                          <td className="p-3.5 font-mono text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-bold uppercase">
                              {ad.placement}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5 capitalize">{ad.mediaType || 'image'} format</div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                              <select
                                value={ad.skipAfterSeconds ?? 5}
                                onChange={(e) => handleUpdateAdTiming(ad.id, 'skipAfterSeconds', Number(e.target.value))}
                                className="bg-slate-950 border border-slate-700 text-amber-300 rounded px-2 py-1 text-xs font-mono font-bold"
                              >
                                <option value={0}>Instant (0s)</option>
                                <option value={3}>Skip after 3s</option>
                                <option value={5}>Skip after 5s (Recommended)</option>
                                <option value={7}>Skip after 7s</option>
                                <option value={10}>Skip after 10s</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <Timer className="w-3.5 h-3.5 text-sky-400" />
                              <select
                                value={ad.displaySeconds || 8}
                                onChange={(e) => handleUpdateAdTiming(ad.id, 'displaySeconds', Number(e.target.value))}
                                className="bg-slate-950 border border-slate-700 text-sky-300 rounded px-2 py-1 text-xs font-mono font-bold"
                              >
                                <option value={5}>5 Seconds</option>
                                <option value={8}>8 Seconds</option>
                                <option value={12}>12 Seconds</option>
                                <option value={15}>15 Seconds</option>
                              </select>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleAdStatus(ad.id, ad.isActive)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 cursor-pointer ${
                                ad.isActive
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              }`}
                            >
                              {ad.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {ad.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteAd(ad.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 hover:text-white transition-colors cursor-pointer"
                              title="Delete Ad"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'buses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Registered Bus Fleets</h2>
                  <p className="text-xs text-slate-400">Manage KSRTC, Swift &amp; Private local buses</p>
                </div>
                <button
                  onClick={() => setShowBusModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Bus</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Bus Name</th>
                        <th className="p-3.5">Registration No</th>
                        <th className="p-3.5">Operator</th>
                        <th className="p-3.5">Type</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {busesList.map((bus) => (
                        <tr key={bus.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-bold text-white">{bus.name}</td>
                          <td className="p-3.5 font-mono text-amber-300">{bus.busNumber || 'N/A'}</td>
                          <td className="p-3.5 font-bold text-blue-400">{bus.operator}</td>
                          <td className="p-3.5 text-slate-300">{bus.busType}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteBus(bus.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 hover:text-white transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-white">Routes &amp; Regional Bus Stops</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <RouteIcon className="w-4 h-4 text-blue-400" /> Defined Routes ({routesList.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {routesList.map(r => (
                      <div key={r.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="font-bold text-white">{r.name}</div>
                        <div className="text-slate-400 text-[11px]">{r.viaText}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" /> Regional Stops ({stopsList.length})
                  </h3>
                  <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1 divide-y divide-slate-800/40">
                    {stopsList.map(st => (
                      <div key={st.id} className="pt-1.5 flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{st.name} ({st.code})</span>
                        <span className="text-slate-400">{st.district}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timetables' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Timetables &amp; Schedules</h2>
                  <p className="text-xs text-slate-400">Manage bus departure times</p>
                </div>
                <button
                  onClick={() => setShowTimetableModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Timetable</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Bus</th>
                        <th className="p-3.5">Route</th>
                        <th className="p-3.5">Departure</th>
                        <th className="p-3.5">Arrival</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {timetablesList.map((tt) => (
                        <tr key={tt.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-bold text-white">{tt.busName}</td>
                          <td className="p-3.5 text-slate-300">{tt.routeName}</td>
                          <td className="p-3.5 font-mono text-emerald-300 font-bold">{tt.departureTime}</td>
                          <td className="p-3.5 font-mono text-amber-300 font-bold">{tt.arrivalTime}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteTimetable(tt.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 hover:text-white transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE AD CAMPAIGN MODAL WITH COMPLETE TIMING & MEDIA CONTROLS */}
      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create Ad Campaign</h3>
              <button onClick={() => setShowAdModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Advertiser Name</label>
                <input
                  type="text"
                  required
                  value={adForm.advertiserName}
                  onChange={(e) => setAdForm({ ...adForm, advertiserName: e.target.value })}
                  placeholder="e.g. Thiruvilwamala Heritage Sweets"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Campaign Headline Title</label>
                <input
                  type="text"
                  required
                  value={adForm.title}
                  onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                  placeholder="e.g. Hot Fresh Unniyappam & Banana Chips"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={adForm.description}
                  onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
                  placeholder="Offer details or Store address..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Media Type</label>
                  <select
                    value={adForm.mediaType}
                    onChange={(e) => setAdForm({ ...adForm, mediaType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                  >
                    <option value="image">High-Res Image Poster</option>
                    <option value="video">Full-Screen Video (.mp4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Placement</label>
                  <select
                    value={adForm.placement}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setAdForm({
                        ...adForm,
                        placement: val,
                        adFormat: val === 'interstitial_loading' ? 'interstitial_loading' : 'banner'
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                  >
                    <option value="interstitial_loading">Full-Screen Search Loading Ad</option>
                    <option value="homepage">Homepage Banner</option>
                    <option value="search_results">Search Results Banner</option>
                    <option value="sticky_anchor">Sticky Bottom Anchor</option>
                    <option value="native_in_feed">Native In-Feed Search</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  {adForm.mediaType === 'video' ? 'Video (.mp4) URL' : 'Poster Image URL'}
                </label>
                <input
                  type="url"
                  required
                  value={adForm.image}
                  onChange={(e) => setAdForm({ ...adForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Target Website / WhatsApp URL</label>
                <input
                  type="url"
                  required
                  value={adForm.targetUrl}
                  onChange={(e) => setAdForm({ ...adForm, targetUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                />
              </div>

              {/* TIMING CONTROLS */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-amber-400 font-bold mb-1 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Skip Lock Timer
                  </label>
                  <select
                    value={adForm.skipAfterSeconds}
                    onChange={(e) => setAdForm({ ...adForm, skipAfterSeconds: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-amber-300 font-mono font-bold"
                  >
                    <option value={0}>0s (Instant Skip)</option>
                    <option value={3}>3 Seconds</option>
                    <option value={5}>5 Seconds (Recommended)</option>
                    <option value={7}>7 Seconds</option>
                    <option value={10}>10 Seconds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sky-400 font-bold mb-1 flex items-center gap-1">
                    <Timer className="w-3 h-3" /> Total Display Time
                  </label>
                  <select
                    value={adForm.displaySeconds}
                    onChange={(e) => setAdForm({ ...adForm, displaySeconds: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-sky-300 font-mono font-bold"
                  >
                    <option value={5}>5 Seconds</option>
                    <option value={8}>8 Seconds</option>
                    <option value={12}>12 Seconds</option>
                    <option value={15}>15 Seconds</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
                >
                  Save Ad Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BUS & TIMETABLE MODALS */}
      {showBusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Bus Fleet</h3>
              <button onClick={() => setShowBusModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateBus} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Bus Name</label>
                <input
                  type="text"
                  required
                  value={busForm.name}
                  onChange={(e) => setBusForm({ ...busForm, name: e.target.value })}
                  placeholder="e.g. Sree Vilwadrinath Express"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Registration No</label>
                  <input
                    type="text"
                    value={busForm.busNumber}
                    onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
                    placeholder="KL-48-B-9901"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Operator</label>
                  <select
                    value={busForm.operator}
                    onChange={(e) => setBusForm({ ...busForm, operator: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="KSRTC">KSRTC</option>
                    <option value="KSRTC Swift">KSRTC Swift</option>
                    <option value="Private">Private Bus</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBusModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Save Bus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTimetableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add Schedule</h3>
              <button onClick={() => setShowTimetableModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateTimetable} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Bus</label>
                <select
                  required
                  value={ttForm.busId}
                  onChange={(e) => setTtForm({ ...ttForm, busId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="">-- Choose Bus Fleet --</option>
                  {busesList.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.operator})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Route</label>
                <select
                  required
                  value={ttForm.routeId}
                  onChange={(e) => setTtForm({ ...ttForm, routeId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="">-- Choose Route --</option>
                  {routesList.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Departure</label>
                  <input
                    type="text"
                    required
                    value={ttForm.departureTime}
                    onChange={(e) => setTtForm({ ...ttForm, departureTime: e.target.value })}
                    placeholder="08:15 AM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Arrival</label>
                  <input
                    type="text"
                    required
                    value={ttForm.arrivalTime}
                    onChange={(e) => setTtForm({ ...ttForm, arrivalTime: e.target.value })}
                    placeholder="09:35 AM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTimetableModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Create Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
