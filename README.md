# Thiruvilwamala Connect (Thiruvilwamala.Live)

> **Local Digital Information & Bus Timetable Platform for Thiruvilwamala, Kerala, India.**

Everything you need to know around Thiruvilwamala. Local bus timetables, connecting route maps, intermediate stop schedules, local business directories, custom AdSense-style advertisement management system, and community digital services for residents and travelers.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (White & Blue RailOne Transit Aesthetic)
- **Database & ORM**: PostgreSQL-ready architecture with Prisma ORM (`prisma/schema.prisma`) & fallback seed store
- **Icons**: Lucide React
- **SEO**: Dynamic metadata, OpenGraph cards, `robots.ts`, `sitemap.ts`, and Schema.org JSON-LD structured data

---

## ✨ Features

1. **Time-Based Dynamic Homepage**:
   - 4 Visual atmospheres (Morning, Afternoon, Evening, Night) dynamically changing based on local Kerala time with Malayalam greetings.
   - Interactive Time Mode Switcher for testing all 4 periods.

2. **RailOne Bus Timetable & Route Search**:
   - Searchable FROM ↔ TO dropdowns with 30+ regional stops (Thiruvilwamala, Thrissur, Shoranur, Ottapalam, Chelakkara, Wadakkanchery, etc.).
   - Swipable popular destination shortcuts.
   - Expandable **Visual Route Schedule Timeline** detailing every intermediate stop and arrival timestamp.
   - Operator filtering (KSRTC, KSRTC Swift, Private) and departure sorting.

3. **Google AdMob / AdSense Full-Screen Interstitial Ad System**:
   - Viewport-filling full-screen video/poster ad player.
   - **Compulsory 5-Second Skip Lock Timer**: Skip button is locked (`🔒 Skip in 5s`) until the compulsory view duration expires, after which `Skip Ad ✕` unlocks.
   - Sticky bottom anchor banner unit (`StickyAnchorAd`) & native in-feed search result ad units (`AdSenseNativeUnit`).

4. **Admin Control Desk (`/admin`)**:
   - 1-Click Quick Demo Login at `/admin/login`.
   - Ad Timing Controls: Configure compulsory skip lock timer (`3s`, `5s`, `7s`, `10s`), total display duration (`5s`, `8s`, `15s`, `30s`), media format (Image vs Video `.mp4`), ad theme accents, and custom CTA text.
   - Full CRUD management for Advertisements, Buses, Routes, Stops, and Timetable departure schedules.
   - Analytics dashboard with impressions, clicks, and CTR % performance tracking.

---

## 🛠️ Getting Started Locally

```bash
# Clone repository
git clone https://github.com/AvinashPanjal/thiruvillamala.git
cd thiruvillamala

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin Demo Access

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@thiruvilwamala.live`
- **Password**: `thiruvilwamala2026`
- *(Or click the **1-Click Quick Demo Login** button)*

---

© 2026 Thiruvilwamala.Live • Built for Thiruvilwamala Community, Thrissur District, Kerala, India.
