import { Stop, Bus, Route, TimetableEntry, Advertisement } from '../types';

export const INITIAL_STOPS: Stop[] = [
  { id: 'stop-tvm', name: 'Thiruvilwamala', code: 'TVM', district: 'Thrissur', isMajor: true },
  { id: 'stop-tsr', name: 'Thrissur', code: 'TSR', district: 'Thrissur', isMajor: true },
  { id: 'stop-srr', name: 'Shoranur', code: 'SRR', district: 'Palakkad', isMajor: true },
  { id: 'stop-otp', name: 'Ottapalam', code: 'OTP', district: 'Palakkad', isMajor: true },
  { id: 'stop-clk', name: 'Chelakkara', code: 'CLK', district: 'Thrissur', isMajor: true },
  { id: 'stop-wki', name: 'Wadakkanchery', code: 'WKI', district: 'Thrissur', isMajor: true },
  { id: 'stop-pyr', name: 'Pazhayannur', code: 'PYR', district: 'Thrissur', isMajor: false },
  { id: 'stop-myn', name: 'Mayannur', code: 'MYN', district: 'Thrissur', isMajor: false },
  { id: 'stop-pmp', name: 'Pampady', code: 'PMP', district: 'Thrissur', isMajor: false },
  { id: 'stop-lkd', name: 'Lakkidi', code: 'LKD', district: 'Palakkad', isMajor: false },
  { id: 'stop-alt', name: 'Alathur', code: 'ALT', district: 'Palakkad', isMajor: true },
  { id: 'stop-pkd', name: 'Palakkad', code: 'PKD', district: 'Palakkad', isMajor: true },
  { id: 'stop-ktp', name: 'Kuthampully', code: 'KTP', district: 'Thrissur', isMajor: false },
  { id: 'stop-ptb', name: 'Pattambi', code: 'PTB', district: 'Palakkad', isMajor: true },
  { id: 'stop-knm', name: 'Kunnamkulam', code: 'KNM', district: 'Thrissur', isMajor: true },
  { id: 'stop-gvr', name: 'Guruvayur', code: 'GVR', district: 'Thrissur', isMajor: true },
];

export const INITIAL_BUSES: Bus[] = [
  { id: 'bus-1', name: 'KSRTC Fast Passenger', busNumber: 'KL-15-A-1024', operator: 'KSRTC', busType: 'Fast Passenger', operatingDays: 'Daily', isDirect: true, phone: '0487-2421150' },
  { id: 'bus-2', name: 'Sree Vilwadrinath Express', busNumber: 'KL-48-B-9901', operator: 'Private', busType: 'Express', operatingDays: 'Daily', isDirect: false, phone: '+91 98471 23456' },
  { id: 'bus-3', name: 'KSRTC Swift Super Fast', busNumber: 'KL-01-CZ-4410', operator: 'KSRTC Swift', busType: 'Super Fast', operatingDays: 'Daily', isDirect: true, phone: '0487-2421150' },
  { id: 'bus-4', name: 'Valluvanad Shuttle', busNumber: 'KL-52-C-1234', operator: 'Private', busType: 'Ordinary', operatingDays: 'Daily', isDirect: false, phone: '+91 94472 88123' },
  { id: 'bus-5', name: 'Nila Chaitanya', busNumber: 'KL-48-D-8822', operator: 'Private', busType: 'Limited Stop', operatingDays: 'Daily', isDirect: false, phone: '+91 98950 11223' },
  { id: 'bus-6', name: 'Gramalakshmi Ordinary', busNumber: 'KL-48-E-3311', operator: 'Private', busType: 'Ordinary', operatingDays: 'Daily', isDirect: false, phone: '+91 94461 44556' },
  { id: 'bus-7', name: 'KSRTC Venad', busNumber: 'KL-15-B-6700', operator: 'KSRTC', busType: 'Ordinary', operatingDays: 'Daily', isDirect: false, phone: '0487-2421150' },
  { id: 'bus-8', name: 'Thiruvilwamala Rider', busNumber: 'KL-08-AX-5544', operator: 'Private', busType: 'Limited Stop', operatingDays: 'Mon-Sat', isDirect: true, phone: '+91 97455 66778' },
];

export const INITIAL_ROUTES: Route[] = [
  {
    id: 'route-tvm-tsr-via-clk',
    name: 'Thiruvilwamala to Thrissur via Chelakkara',
    originName: 'Thiruvilwamala',
    destName: 'Thrissur',
    viaText: 'via Chelakkara, Wadakkanchery',
    approxDuration: 80,
    stops: [
      { stopId: 'stop-tvm', stopName: 'Thiruvilwamala', stopOrder: 1, offsetMins: 0, arrivalTime: 'Departure' },
      { stopId: 'stop-clk', stopName: 'Chelakkara', stopOrder: 2, offsetMins: 20, arrivalTime: '+20 mins' },
      { stopId: 'stop-pyr', stopName: 'Pazhayannur', stopOrder: 3, offsetMins: 35, arrivalTime: '+35 mins' },
      { stopId: 'stop-wki', stopName: 'Wadakkanchery', stopOrder: 4, offsetMins: 55, arrivalTime: '+55 mins' },
      { stopId: 'stop-tsr', stopName: 'Thrissur', stopOrder: 5, offsetMins: 80, arrivalTime: '+80 mins' },
    ]
  },
  {
    id: 'route-tvm-srr-otp',
    name: 'Thiruvilwamala to Ottapalam via Shoranur',
    originName: 'Thiruvilwamala',
    destName: 'Ottapalam',
    viaText: 'via Pampady, Shoranur',
    approxDuration: 45,
    stops: [
      { stopId: 'stop-tvm', stopName: 'Thiruvilwamala', stopOrder: 1, offsetMins: 0, arrivalTime: 'Departure' },
      { stopId: 'stop-pmp', stopName: 'Pampady', stopOrder: 2, offsetMins: 10, arrivalTime: '+10 mins' },
      { stopId: 'stop-srr', stopName: 'Shoranur', stopOrder: 3, offsetMins: 25, arrivalTime: '+25 mins' },
      { stopId: 'stop-otp', stopName: 'Ottapalam', stopOrder: 4, offsetMins: 45, arrivalTime: '+45 mins' },
    ]
  }
];

export const INITIAL_TIMETABLES: TimetableEntry[] = [
  {
    id: 'tt-1',
    busId: 'bus-1',
    busName: 'KSRTC Fast Passenger',
    busNumber: 'KL-15-A-1024',
    operator: 'KSRTC',
    busType: 'Fast Passenger',
    operatingDays: 'Daily',
    routeId: 'route-tvm-tsr-via-clk',
    routeName: 'Thiruvilwamala to Thrissur via Chelakkara',
    originName: 'Thiruvilwamala',
    destName: 'Thrissur',
    viaText: 'via Chelakkara, Wadakkanchery',
    departureTime: '06:15 AM',
    arrivalTime: '07:35 AM',
    direction: 'OUTBOUND',
    approxDuration: 80,
    isDirect: true,
    phone: '0487-2421150',
    stops: [
      { stopId: 'stop-tvm', stopName: 'Thiruvilwamala Stand', stopOrder: 1, offsetMins: 0, arrivalTime: '06:15 AM' },
      { stopId: 'stop-clk', stopName: 'Chelakkara Center', stopOrder: 2, offsetMins: 20, arrivalTime: '06:35 AM' },
      { stopId: 'stop-pyr', stopName: 'Pazhayannur Junction', stopOrder: 3, offsetMins: 35, arrivalTime: '06:50 AM' },
      { stopId: 'stop-wki', stopName: 'Wadakkanchery Stand', stopOrder: 4, offsetMins: 55, arrivalTime: '07:10 AM' },
      { stopId: 'stop-tsr', stopName: 'Thrissur KSRTC Stand', stopOrder: 5, offsetMins: 80, arrivalTime: '07:35 AM' },
    ]
  }
];

export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-interstitial-1',
    advertiserName: 'Thiruvilwamala Heritage Sweets & Bakery',
    title: 'Hot Fresh Unniyappam & Pure Coconut Oil Banana Chips',
    description: 'Crispy Kerala snacks prepared fresh every morning & evening. Stop by Thiruvilwamala Bus Stand before your journey!',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1600&auto=format&fit=crop',
    mediaType: 'image',
    targetUrl: 'https://example.com/bakery',
    placement: 'interstitial_loading',
    adFormat: 'interstitial_loading',
    adTheme: 'amber',
    ctaText: 'Visit Bakery Store',
    priority: 1,
    displaySeconds: 15,      // Admin configured total display duration
    skipAfterSeconds: 5,     // Compulsory view lock duration before close (X) unlocks
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    impressions: 5120,
    clicks: 489,
    badgeText: 'Featured Local Merchant',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-1',
    advertiserName: 'Thiruvilwamala Heritage Bakery & Sweets',
    title: 'Fresh Hot Banana Chips & Kerala Unniyappam',
    description: 'Crispy snacks made daily in pure coconut oil. Perfect companion for your journey! Located opposite Thiruvilwamala Bus Stand.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    mediaType: 'image',
    targetUrl: 'https://example.com/bakery',
    placement: 'homepage',
    adFormat: 'banner',
    adTheme: 'blue',
    ctaText: 'Order Snacks Now',
    priority: 1,
    displaySeconds: 15,
    skipAfterSeconds: 5,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    impressions: 1420,
    clicks: 89,
    badgeText: 'Featured Local Bakery',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-2',
    advertiserName: 'Chelakkara Handloom Textiles',
    title: 'Authentic Kerala Kasavu Sarees & Mundu',
    description: 'Direct weavers outlet. Special festival collections with traditional gold border designs. Visit our Chelakkara Showroom today.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    mediaType: 'image',
    targetUrl: 'https://example.com/textiles',
    placement: 'search_results',
    adFormat: 'card',
    adTheme: 'purple',
    ctaText: 'Explore Collection',
    priority: 1,
    displaySeconds: 15,
    skipAfterSeconds: 5,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    isActive: true,
    impressions: 2150,
    clicks: 143,
    badgeText: 'Local Craft Partner',
    createdAt: new Date().toISOString()
  }
];
