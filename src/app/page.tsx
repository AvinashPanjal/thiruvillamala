import React from 'react';
import Metadata from 'next';
import { getStops, getAds } from '@/lib/data-store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TimeBasedHero } from '@/components/TimeBasedHero';
import { PopularRoutesSection } from '@/components/PopularRoutesSection';
import { AdvertisementCard } from '@/components/AdvertisementCard';
import { FeatureCard, LocalFeatureItem } from '@/components/FeatureCard';
import { LocalInfoSection } from '@/components/LocalInfoSection';
import { Sparkles, Shield, Clock, Compass } from 'lucide-react';

export const metadata = {
  title: 'Thiruvilwamala.Live | Local Info & Bus Timetable Platform',
  description: 'Everything you need to know around Thiruvilwamala, Kerala. Real-time bus timetables to Thrissur, Shoranur, Ottapalam, Chelakkara, Wadakkanchery & local information.',
  keywords: ['Thiruvilwamala', 'Thiruvilwamala bus timing', 'Thiruvilwamala to Thrissur bus', 'Sree Vilwadrinath Temple', 'Ivarmadhom', 'Kuthampully handloom', 'Chelakkara bus timetable'],
  openGraph: {
    title: 'Thiruvilwamala.Live | Local Info & Bus Timetables',
    description: 'Find bus schedules, intermediate stop timings, and local places around Thiruvilwamala, Kerala.',
    url: 'https://thiruvilwamala.live',
    siteName: 'Thiruvilwamala Connect',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function HomePage() {
  const stops = await getStops();
  const homepageAds = await getAds('homepage');
  const primaryAd = homepageAds[0] || null;

  const interstitialAds = await getAds('interstitial_loading');
  const interstitialAd = interstitialAds[0] || primaryAd;

  const localFeatures: LocalFeatureItem[] = [
    {
      id: 'feat-1',
      title: 'Train Timetables & Express Connections',
      malayalamTitle: 'തീവണ്ടി സമയം & വിവരങ്ങൾ',
      description: 'Train departure schedules at Shoranur Junction (SRR) & Ottapalam (OTP) with connecting bus sync.',
      category: 'Rail Transit',
      iconName: 'train',
      status: 'coming_soon',
      previewDetails: [
        'Live train arrivals at Shoranur Junction (8 km from Thiruvilwamala)',
        'Platform numbers and express train halt schedules',
        'Auto-suggested connecting bus from Thiruvilwamala stand to Shoranur station'
      ]
    },
    {
      id: 'feat-2',
      title: 'Local Businesses & Artisans Directory',
      malayalamTitle: 'പ്രാദേശിക വ്യാപാരങ്ങൾ & കൈത്തറി',
      description: 'Directory of Kuthampully handloom weavers, bakeries, workshops, shops & home services.',
      category: 'Commerce',
      iconName: 'store',
      status: 'available',
      previewDetails: [
        'Verified phone numbers & store locations near Temple road',
        'Kuthampully traditional saree weavers direct contact',
        'Emergency two-wheeler and car repair mechanics'
      ]
    },
    {
      id: 'feat-3',
      title: 'Hospitals & 24/7 Pharmacies',
      malayalamTitle: 'ആശുപത്രികൾ & മരുന്നുകടകൾ',
      description: 'Emergency doctors, clinics, ambulances & night pharmacy contacts in Thiruvilwamala & Chelakkara.',
      category: 'Healthcare',
      iconName: 'medical',
      status: 'coming_soon',
      previewDetails: [
        '24x7 Emergency ambulance call button',
        'Night pharmacy rotation status in Thiruvilwamala & Chelakkara',
        'Doctor visiting hours at primary health center & private clinics'
      ]
    },
    {
      id: 'feat-4',
      title: 'Restaurants, Cafes & Traditional Eats',
      malayalamTitle: 'ഹോട്ടലുകൾ & ഭക്ഷണശാലകൾ',
      description: 'Sadhya, Kerala breakfast spots, hot tea shops, and Nila river view restaurants.',
      category: 'Dining',
      iconName: 'utensils',
      status: 'coming_soon',
      previewDetails: [
        'Traditional Kerala breakfast spots opening by 6:00 AM',
        'Pure vegetarian Sadhya dining near Sree Vilwadrinath temple',
        'Fresh river Karimeen & dining along Bharathapuzha bank'
      ]
    },
    {
      id: 'feat-5',
      title: 'Places to Visit & Cultural Guides',
      malayalamTitle: 'സന്ദർശന സ്ഥലങ്ങൾ',
      description: 'Guides to Vilwadrinath Temple, Ivarmadhom, Punarjani Guha cave, Nila river spots.',
      category: 'Tourism',
      iconName: 'landmark',
      status: 'available',
      previewDetails: [
        'Temple darshan timings and festival dates (Vilwadrinath Ekadasi)',
        'Ivarmadhom Pithru Tharpanam rituals guidance',
        'Punarjani Guha natural cave location & visiting guidelines'
      ]
    },
    {
      id: 'feat-6',
      title: 'Local Events & Temple Festivals',
      malayalamTitle: 'പ്രാദേശിക ഉത്സവങ്ങൾ & പരിപാടികൾ',
      description: 'Upcoming Ekadasi festivals, Vela celebrations, cultural programs & panchayath announcements.',
      category: 'Events',
      iconName: 'calendar',
      status: 'coming_soon',
      previewDetails: [
        'Thiruvilwamala Ekadasi elephant procession schedule',
        'Pazhayannur & Chelakkara Vela festival dates',
        'School & college cultural events calendar'
      ]
    },
    {
      id: 'feat-7',
      title: 'Emergency Contacts & Helplines',
      malayalamTitle: 'അടിയന്തര ഫോൺ നമ്പറുകൾ',
      description: 'Panchayath office, KSEB electricity sub-station, police, fire force & KSRTC enquiry.',
      category: 'Utility',
      iconName: 'phone',
      status: 'coming_soon',
      previewDetails: [
        'KSEB Chelakkara/Thiruvilwamala power breakdown helpline',
        'Pazhayannur Police station & Fire rescue numbers',
        'KSRTC Thrissur & Shoranur depot master desk numbers'
      ]
    },
    {
      id: 'feat-8',
      title: 'Weather & River Water Level',
      malayalamTitle: 'കാലാവസ്ഥ & നിള നദി ജലനിരപ്പ്',
      description: 'Real-time local weather forecasts, rainfall updates & Bharathapuzha water status.',
      category: 'Environment',
      iconName: 'cloud',
      status: 'coming_soon',
      previewDetails: [
        'Thiruvilwamala daily temperature and humidity report',
        'Monsoon water levels at Nila Mayannur bridge check-point',
        'Weather alerts for agricultural workers'
      ]
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thiruvilwamala Connect',
    alternateName: 'Thiruvilwamala.Live',
    url: 'https://thiruvilwamala.live',
    description: 'Local information platform and bus timetable route directory for Thiruvilwamala, Kerala.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://thiruvilwamala.live/bus-search?from={from}&to={to}',
      'query-input': 'required name=from'
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        <TimeBasedHero stops={stops} interstitialAd={interstitialAd} />

        {primaryAd && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdvertisementCard ad={primaryAd} />
          </section>
        )}

        <PopularRoutesSection />

        <section id="features" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" /> Expandable Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Digital Information Hub for Thiruvilwamala
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                The platform is architected to house all community services. Explore live features or click any &quot;Coming Soon&quot; card to view upcoming roadmap details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {localFeatures.map((feat) => (
              <FeatureCard key={feat.id} feature={feat} />
            ))}
          </div>
        </section>

        <LocalInfoSection />
      </main>

      <Footer />
    </div>
  );
}
