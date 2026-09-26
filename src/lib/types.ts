export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Stop {
  id: string;
  name: string;
  code: string;
  district: string;
  isMajor: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Bus {
  id: string;
  name: string;
  busNumber?: string;
  operator: 'KSRTC' | 'KSRTC Swift' | 'Private';
  busType: 'Fast Passenger' | 'Super Fast' | 'Ordinary' | 'Limited Stop' | 'Express';
  operatingDays: string;
  isDirect: boolean;
  phone?: string;
}

export interface RouteStopDetail {
  stopId: string;
  stopName: string;
  stopOrder: number;
  offsetMins: number;
  arrivalTime: string;
}

export interface Route {
  id: string;
  name: string;
  originName: string;
  destName: string;
  viaText: string;
  approxDuration: number;
  stops: RouteStopDetail[];
}

export interface TimetableEntry {
  id: string;
  busId: string;
  busName: string;
  busNumber?: string;
  operator: 'KSRTC' | 'KSRTC Swift' | 'Private';
  busType: 'Fast Passenger' | 'Super Fast' | 'Ordinary' | 'Limited Stop' | 'Express';
  operatingDays: string;
  routeId: string;
  routeName: string;
  originName: string;
  destName: string;
  viaText: string;
  departureTime: string;
  arrivalTime: string;
  direction: 'OUTBOUND' | 'INBOUND';
  approxDuration: number;
  stops: RouteStopDetail[];
  isDirect: boolean;
  phone?: string;
}

export type AdPlacement = 'homepage' | 'search_results' | 'bus_details' | 'features' | 'interstitial_loading' | 'sticky_anchor' | 'native_in_feed' | 'leaderboard';
export type AdFormat = 'interstitial_loading' | 'sticky_anchor' | 'native_in_feed' | 'leaderboard' | 'banner' | 'card';
export type AdMediaType = 'image' | 'video' | 'poster';
export type AdTheme = 'blue' | 'emerald' | 'amber' | 'purple' | 'dark';

export interface Advertisement {
  id: string;
  advertiserName: string;
  title: string;
  description: string;
  image: string;
  mediaType: AdMediaType;
  videoUrl?: string;
  targetUrl: string;
  placement: AdPlacement;
  adFormat: AdFormat;
  adTheme?: AdTheme;
  ctaText?: string;
  priority?: number;
  displaySeconds: number;     // Total ad display time before auto redirect (e.g. 15s)
  skipAfterSeconds: number;   // Seconds before Close button unlocks (e.g. 5s, 10s)
  rotationIntervalSeconds?: number; // Auto-rotate interval for banner carousel (e.g. 5s)
  startDate: string;
  endDate: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  badgeText?: string;
  createdAt: string;
}

export interface SearchParams {
  from?: string;
  to?: string;
  timeFilter?: string;
  operator?: string;
  busType?: string;
  sortBy?: string;
}
