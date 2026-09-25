import { Stop, Bus, Route, TimetableEntry, Advertisement, SearchParams } from './types';
import { INITIAL_STOPS, INITIAL_BUSES, INITIAL_ROUTES, INITIAL_TIMETABLES, INITIAL_ADS } from './data/mock-db';

// Global singletons for in-memory persistence in Next.js dev server
declare global {
  var _thiruvilwamalaStops: Stop[] | undefined;
  var _thiruvilwamalaBuses: Bus[] | undefined;
  var _thiruvilwamalaRoutes: Route[] | undefined;
  var _thiruvilwamalaTimetables: TimetableEntry[] | undefined;
  var _thiruvilwamalaAds: Advertisement[] | undefined;
}

if (!global._thiruvilwamalaStops) {
  global._thiruvilwamalaStops = [...INITIAL_STOPS];
}
if (!global._thiruvilwamalaBuses) {
  global._thiruvilwamalaBuses = [...INITIAL_BUSES];
}
if (!global._thiruvilwamalaRoutes) {
  global._thiruvilwamalaRoutes = [...INITIAL_ROUTES];
}
if (!global._thiruvilwamalaTimetables) {
  global._thiruvilwamalaTimetables = [...INITIAL_TIMETABLES];
}
if (!global._thiruvilwamalaAds) {
  global._thiruvilwamalaAds = [...INITIAL_ADS];
}

const stopsStore = global._thiruvilwamalaStops;
const busesStore = global._thiruvilwamalaBuses;
const routesStore = global._thiruvilwamalaRoutes;
const timetablesStore = global._thiruvilwamalaTimetables;
const adsStore = global._thiruvilwamalaAds;

// --- STOPS ---
export async function getStops(): Promise<Stop[]> {
  return [...stopsStore];
}

export async function addStop(stop: Omit<Stop, 'id'>): Promise<Stop> {
  const newStop: Stop = {
    ...stop,
    id: `stop-${Date.now()}`
  };
  stopsStore.push(newStop);
  return newStop;
}

export async function deleteStop(id: string): Promise<boolean> {
  const idx = stopsStore.findIndex(s => s.id === id);
  if (idx !== -1) {
    stopsStore.splice(idx, 1);
    return true;
  }
  return false;
}

// --- BUSES ---
export async function getBuses(): Promise<Bus[]> {
  return [...busesStore];
}

export async function getBusById(id: string): Promise<Bus | null> {
  return busesStore.find(b => b.id === id) || null;
}

export async function addBus(bus: Omit<Bus, 'id'>): Promise<Bus> {
  const newBus: Bus = {
    ...bus,
    id: `bus-${Date.now()}`
  };
  busesStore.push(newBus);
  return newBus;
}

export async function updateBus(id: string, busData: Partial<Bus>): Promise<Bus | null> {
  const idx = busesStore.findIndex(b => b.id === id);
  if (idx !== -1) {
    busesStore[idx] = { ...busesStore[idx], ...busData };
    return busesStore[idx];
  }
  return null;
}

export async function deleteBus(id: string): Promise<boolean> {
  const idx = busesStore.findIndex(b => b.id === id);
  if (idx !== -1) {
    busesStore.splice(idx, 1);
    // clean up associated timetables
    for (let i = timetablesStore.length - 1; i >= 0; i--) {
      if (timetablesStore[i].busId === id) {
        timetablesStore.splice(i, 1);
      }
    }
    return true;
  }
  return false;
}

// --- ROUTES ---
export async function getRoutes(): Promise<Route[]> {
  return [...routesStore];
}

export async function addRoute(route: Omit<Route, 'id'>): Promise<Route> {
  const newRoute: Route = {
    ...route,
    id: `route-${Date.now()}`
  };
  routesStore.push(newRoute);
  return newRoute;
}

export async function deleteRoute(id: string): Promise<boolean> {
  const idx = routesStore.findIndex(r => r.id === id);
  if (idx !== -1) {
    routesStore.splice(idx, 1);
    return true;
  }
  return false;
}

// --- TIMETABLES & BUS SEARCH ---
export async function getTimetables(): Promise<TimetableEntry[]> {
  return [...timetablesStore];
}

export async function addTimetable(entry: Omit<TimetableEntry, 'id'>): Promise<TimetableEntry> {
  const newEntry: TimetableEntry = {
    ...entry,
    id: `tt-${Date.now()}`
  };
  timetablesStore.push(newEntry);
  return newEntry;
}

export async function deleteTimetable(id: string): Promise<boolean> {
  const idx = timetablesStore.findIndex(t => t.id === id);
  if (idx !== -1) {
    timetablesStore.splice(idx, 1);
    return true;
  }
  return false;
}

/**
 * Advanced search logic for buses matching From and To criteria.
 * Handles exact matching, partial route stop sequence matching, time filtering, operator filtering, sorting.
 */
export async function searchBuses(params: SearchParams): Promise<TimetableEntry[]> {
  const fromRaw = params.from?.trim() || '';
  const toRaw = params.to?.trim() || '';

  if (!fromRaw && !toRaw) {
    return [...timetablesStore];
  }

  let results = timetablesStore.filter(entry => {
    // Search by origin/destination name or intermediate stops list
    const fromLower = fromRaw.toLowerCase();
    const toLower = toRaw.toLowerCase();

    // Check if origin matches OR any stop in route matches
    const originMatch = !fromRaw ||
      entry.originName.toLowerCase().includes(fromLower) ||
      entry.stops.some(s => s.stopName.toLowerCase().includes(fromLower));

    // Check if destination matches OR any stop after origin matches
    const destMatch = !toRaw ||
      entry.destName.toLowerCase().includes(toLower) ||
      entry.stops.some(s => s.stopName.toLowerCase().includes(toLower));

    if (!originMatch || !destMatch) return false;

    // Check sequence order if both from and to are specified
    if (fromRaw && toRaw) {
      const fromIdx = entry.stops.findIndex(s => s.stopName.toLowerCase().includes(fromLower));
      const toIdx = entry.stops.findIndex(s => s.stopName.toLowerCase().includes(toLower));
      
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx >= toIdx) {
        return false; // Wrong direction for this route schedule
      }
    }

    // Time filter
    if (params.timeFilter && params.timeFilter !== 'all') {
      const depHour = parseHour(entry.departureTime);
      if (params.timeFilter === 'morning' && (depHour < 5 || depHour >= 12)) return false;
      if (params.timeFilter === 'afternoon' && (depHour < 12 || depHour >= 16)) return false;
      if (params.timeFilter === 'evening' && (depHour < 16 || depHour >= 20)) return false;
      if (params.timeFilter === 'night' && (depHour >= 5 && depHour < 20)) return false;
    }

    // Operator filter
    if (params.operator && params.operator !== 'all') {
      if (params.operator === 'ksrtc' && !entry.operator.toLowerCase().includes('ksrtc')) return false;
      if (params.operator === 'private' && entry.operator.toLowerCase() !== 'private') return false;
    }

    // Bus Type / Direct filter
    if (params.busType && params.busType !== 'all') {
      if (params.busType === 'direct' && !entry.isDirect) return false;
      if (params.busType === 'fast' && !(entry.busType.includes('Fast') || entry.busType.includes('Express'))) return false;
    }

    return true;
  });

  // Sorting
  if (params.sortBy === 'latest') {
    results.sort((a, b) => parseTimeValue(b.departureTime) - parseTimeValue(a.departureTime));
  } else if (params.sortBy === 'duration') {
    results.sort((a, b) => a.approxDuration - b.approxDuration);
  } else {
    // Default: earliest departure
    results.sort((a, b) => parseTimeValue(a.departureTime) - parseTimeValue(b.departureTime));
  }

  return results;
}

function parseHour(timeStr: string): number {
  // Converts "06:15 AM" or "02:45 PM" to 24-hour hour integer
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return 9;
  const [hhmm, period] = parts;
  const [hhStr] = hhmm.split(':');
  let hh = parseInt(hhStr, 10);
  if (period.toUpperCase() === 'PM' && hh < 12) hh += 12;
  if (period.toUpperCase() === 'AM' && hh === 12) hh = 0;
  return hh;
}

function parseTimeValue(timeStr: string): number {
  // Converts "06:15 AM" to minutes from midnight
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return 0;
  const [hhmm, period] = parts;
  const [hhStr, mmStr] = hhmm.split(':');
  let hh = parseInt(hhStr, 10);
  const mm = parseInt(mmStr || '0', 10);
  if (period.toUpperCase() === 'PM' && hh < 12) hh += 12;
  if (period.toUpperCase() === 'AM' && hh === 12) hh = 0;
  return hh * 60 + mm;
}

// --- ADVERTISEMENTS ---
export async function getAds(placement?: string): Promise<Advertisement[]> {
  if (!placement) return [...adsStore];
  return adsStore.filter(ad => ad.placement === placement || ad.placement === 'homepage');
}

export async function getAdById(id: string): Promise<Advertisement | null> {
  return adsStore.find(ad => ad.id === id) || null;
}

export async function addAd(ad: Omit<Advertisement, 'id' | 'impressions' | 'clicks' | 'createdAt'>): Promise<Advertisement> {
  const newAd: Advertisement = {
    ...ad,
    id: `ad-${Date.now()}`,
    impressions: 0,
    clicks: 0,
    createdAt: new Date().toISOString()
  };
  adsStore.unshift(newAd);
  return newAd;
}

export async function updateAd(id: string, data: Partial<Advertisement>): Promise<Advertisement | null> {
  const idx = adsStore.findIndex(ad => ad.id === id);
  if (idx !== -1) {
    adsStore[idx] = { ...adsStore[idx], ...data };
    return adsStore[idx];
  }
  return null;
}

export async function deleteAd(id: string): Promise<boolean> {
  const idx = adsStore.findIndex(ad => ad.id === id);
  if (idx !== -1) {
    adsStore.splice(idx, 1);
    return true;
  }
  return false;
}

export async function trackAdImpression(id: string): Promise<void> {
  const ad = adsStore.find(a => a.id === id);
  if (ad) {
    ad.impressions += 1;
  }
}

export async function trackAdClick(id: string): Promise<void> {
  const ad = adsStore.find(a => a.id === id);
  if (ad) {
    ad.clicks += 1;
  }
}

// --- STATS FOR ADMIN DASHBOARD ---
export async function getAdminStats() {
  const totalAds = adsStore.length;
  const activeAds = adsStore.filter(a => a.isActive).length;
  const totalImpressions = adsStore.reduce((sum, a) => sum + a.impressions, 0);
  const totalClicks = adsStore.reduce((sum, a) => sum + a.clicks, 0);
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';

  const totalBuses = busesStore.length;
  const totalRoutes = routesStore.length;
  const totalStops = stopsStore.length;
  const totalTimetables = timetablesStore.length;

  return {
    totalAds,
    activeAds,
    totalImpressions,
    totalClicks,
    ctr: `${ctr}%`,
    totalBuses,
    totalRoutes,
    totalStops,
    totalTimetables,
  };
}
