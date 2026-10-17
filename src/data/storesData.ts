import { StoreInfo } from '../types';

export const STORES_DATA: StoreInfo[] = [
  {
    id: 'amazon-appstore',
    name: 'Amazon Appstore',
    tagline: 'Publish for free to millions of Fire OS, Fire Tablet, Fire TV, and Android users worldwide.',
    type: 'alternative-store',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: '200M+ Active Devices',
    easeRating: 4,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      '100% Free Developer Account registration (no annual or initial fee)',
      'Pre-installed on all Fire Tablets, Fire TV stick, and Windows 11 Android Subsystem',
      'Supports In-App Purchasing (IAP), Ads, and Amazon Coins monetization',
      'Easy submission pipeline with high approval rate'
    ],
    cons: [
      'Lower market share on non-Amazon Android phones compared to Play Store',
      'Requires Amazon In-App Purchasing SDK if migrating Google Play billing'
    ],
    description: 'The Amazon Appstore is the official app store for Amazon Fire devices and offers a seamless way to distribute standard Android APKs/AABs to millions of global users with zero account fees.',
    bestFor: 'Games, media streaming, utility apps, and cross-platform apps targeting Fire OS & Android.',
    websiteUrl: 'https://developer.amazon.com/apps-and-games',
    submissionGuideId: 'guide-amazon',
    popularApps: ['Disney+', 'TikTok', 'Minecraft', 'Spotify', 'Roblox']
  },
  {
    id: 'f-droid',
    name: 'F-Droid Repository',
    tagline: 'The premiere open-source Android app repository with trusted automated build systems.',
    type: 'alternative-store',
    fee: '$0 (100% Free)',
    openSourceOnly: true,
    userBase: '15M+ Privacy & Tech Enthusiasts',
    easeRating: 3,
    autoUpdateSupport: true,
    inAppBilling: false,
    pros: [
      '100% Free and transparent open-source publishing workflow',
      'F-Droid automatically compiles your app from your public GitHub/GitLab source code',
      'Massive trust among privacy-conscious Android power users',
      'Built-in background auto-update engine for users'
    ],
    cons: [
      'App source code must be Open Source (FOSS license like MIT, GPL, Apache 2.0)',
      'Strict build requirements (no proprietary tracking or closed SDKs allowed)'
    ],
    description: 'F-Droid is an installable catalog of FOSS (Free and Open Source Software) applications for Android. F-Droid builds apps directly from source, guaranteeing maximum privacy and trust for users.',
    bestFor: 'Open-source tools, privacy utilities, productivity apps, and developer tools.',
    websiteUrl: 'https://f-droid.org/',
    submissionGuideId: 'guide-fdroid',
    popularApps: ['NewPipe', 'VLC for Android', 'K-9 Mail', 'Signal (F-Droid fork)', 'Termux']
  },
  {
    id: 'samsung-galaxy-store',
    name: 'Samsung Galaxy Store',
    tagline: 'Pre-installed on over 1 Billion Samsung Galaxy smartphones and tablets worldwide.',
    type: 'alternative-store',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: '1B+ Samsung Galaxy Devices',
    easeRating: 4,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      'Free Samsung Seller Office account with zero registration fee',
      'Pre-installed on every Samsung device out of the box',
      'Special promotional opportunities, themes, and edge panel integrations',
      'Supports Samsung In-App Purchase (IAP) SDK'
    ],
    cons: [
      'Review process can take 2-4 business days',
      'Only reaches Samsung hardware users'
    ],
    description: 'Samsung Galaxy Store provides direct access to hundreds of millions of active Samsung smartphone users. Registrations for Samsung Developer accounts are completely free.',
    bestFor: 'Apps designed for Galaxy devices, themes, customization utilities, and games.',
    websiteUrl: 'https://seller.samsungapps.com/',
    submissionGuideId: 'guide-samsung',
    popularApps: ['Fortnite', 'Genshin Impact', 'Good Lock', 'Samsung Health']
  },
  {
    id: 'github-releases',
    name: 'GitHub / GitLab Releases (Self-Hosting)',
    tagline: 'Host signed APKs on fast global CDNs with direct download links and automated update checks.',
    type: 'self-host',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: 'Direct Link Distribution (Unlimited)',
    easeRating: 5,
    autoUpdateSupport: true,
    inAppBilling: false,
    pros: [
      'Zero cost and zero approval wait times—publish updates instantly',
      'Unlimited download bandwidth powered by GitHub/GitLab high-speed CDN',
      'Integrate simple in-app auto-update checks via GitHub Releases API',
      'Complete ownership of binary distribution with clean release tags'
    ],
    cons: [
      'Users must enable "Install from Unknown Sources / Allow Chrome" on first install',
      'No built-in store discovery algorithm (requires linking from your website or social media)'
    ],
    description: 'Publishing signed release APKs directly to GitHub or GitLab Releases gives you instant global hosting. You can easily add a 20-line update check in your app to prompt users whenever a new release tag is created on GitHub.',
    bestFor: 'Indie projects, beta software, internal utilities, and developer tools.',
    websiteUrl: 'https://github.com',
    submissionGuideId: 'guide-github-releases',
    popularApps: ['ReVanced Manager', 'Seal Video Downloader', ' Tachiyomi / Mihon', 'Lemuroid']
  },
  {
    id: 'apkpure-aptoide',
    name: 'APKPure & Aptoide Repository',
    tagline: 'Massive third-party app stores with tens of millions of monthly organic APK downloads.',
    type: 'alternative-store',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: '100M+ Monthly Visitors',
    easeRating: 5,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      'Free developer claim & submission portal',
      'High organic search traffic for Android utilities and games',
      'Aptoide provides a decentralized store model with custom branded sub-stores',
      'Fast automated virus and malware scanning'
    ],
    cons: [
      'Contains ads on the platform site/app',
      'Lower user trust compared to official vendor stores'
    ],
    description: 'APKPure, Aptoide, and Uptodown are top tier alternative Android app repositories that allow developers to claim their apps, upload release APKs for free, and gain immediate global discoverability.',
    bestFor: 'Utilities, productivity apps, media downloaders, and international apps.',
    websiteUrl: 'https://apkpure.com/developer',
    submissionGuideId: 'guide-apkpure',
    popularApps: ['PUBG Mobile', 'WhatsApp Business', 'CapCut', 'Snaptube']
  },
  {
    id: 'pwa-twa',
    name: 'Progressive Web App (PWA) / TWA',
    tagline: 'Bypass app stores entirely. Users install directly from Chrome or your website.',
    type: 'pwa',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: 'Web-wide Access (4B+ Chrome / Edge users)',
    easeRating: 5,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      'Zero store approvals, zero 30% commission fees, zero sideload warnings!',
      'Instant updates across all devices the moment you deploy your web app',
      'Full offline capabilities with Service Workers and Web App Manifest',
      'Supports push notifications, camera, geolocation, web payments, and home screen icons'
    ],
    cons: [
      'Limited access to certain low-level hardware APIs (Bluetooth background scanning, system overlays)',
      'Requires web tech stack (React, Vue, HTML5, WebAssembly)'
    ],
    description: 'Progressive Web Apps allow web applications to be added directly to an Android device home screen with full screen presence, offline caching, and instant update deployment without any app store middleman.',
    bestFor: 'SaaS applications, dashboards, e-commerce, news platforms, productivity tools, and web utilities.',
    websiteUrl: 'https://web.dev/progressive-web-apps/',
    submissionGuideId: 'guide-pwa',
    popularApps: ['Twitter Lite / X', 'Pinterest PWA', 'Uber Web', 'Spotify Web Player']
  },
  {
    id: 'taptap',
    name: 'TapTap Global Store',
    tagline: 'The leading gamer-focused community and app discovery platform for mobile games.',
    type: 'alternative-store',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: '60M+ Active Gamers',
    easeRating: 4,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      '100% Free developer portal with huge focus on indie game developers',
      'High community engagement with reviews, forum threads, and beta testing',
      'Supports direct APK download and pre-registration events',
      'Great exposure for games seeking active user feedback'
    ],
    cons: [
      'Primarily suited for games rather than general utility software'
    ],
    description: 'TapTap is a vibrant mobile gaming community and alternative app store where indie and AAA developers release games without platform listing fees.',
    bestFor: 'Mobile games, RPGs, action games, and gaming companion apps.',
    websiteUrl: 'https://developer.taptap.io/',
    submissionGuideId: 'guide-taptap',
    popularApps: ['Genshin Impact', 'League of Legends: Wild Rift', 'Apex Legends Mobile', 'Terraria']
  },
  {
    id: 'firebase-app-distribution',
    name: 'Firebase App Distribution',
    tagline: 'Distribute early builds and beta APKs to trusted testers with instant email links.',
    type: 'beta-test',
    fee: '$0 (100% Free)',
    openSourceOnly: false,
    userBase: 'Private Beta & Internal Testers',
    easeRating: 5,
    autoUpdateSupport: true,
    inAppBilling: false,
    pros: [
      '100% free service included in Google Firebase free tier',
      'Automate builds via CLI, Fastlane, GitHub Actions, or Gradle plugin',
      'In-app feedback collection and crash reporting with Firebase Crashlytics',
      'Manage tester groups with simple email invitations'
    ],
    cons: [
      'Designed for internal testing and beta releases rather than public store discovery'
    ],
    description: 'Firebase App Distribution provides a fast, free, and streamlined way to get pre-release Android APKs to client teams, QA testers, and early beta access users.',
    bestFor: 'Internal team builds, client reviews, beta releases, and staging builds.',
    websiteUrl: 'https://firebase.google.com/products/app-distribution',
    submissionGuideId: 'guide-firebase',
    popularApps: ['Enterprise App Betas', 'Internal Agency Deliverables', 'QA Staging Builds']
  },
  {
    id: 'direct-web-hosting',
    name: 'Self-Hosted Website Landing Page',
    tagline: 'Your own branded app page with direct APK download, QR codes, and install guides.',
    type: 'self-host',
    fee: '$0 (Free with GitHub Pages / Vercel / Netlify)',
    openSourceOnly: false,
    userBase: 'Direct Web Visitors',
    easeRating: 5,
    autoUpdateSupport: true,
    inAppBilling: true,
    pros: [
      'Full visual control over branding, pricing, monetization, and call-to-actions',
      'Zero platform fees, zero strict store guidelines, total creative control',
      'Free hosting available on Netlify, Vercel, Cloudflare Pages, or GitHub Pages',
      'Easily generate mobile-scannable QR codes for instant phone downloads'
    ],
    cons: [
      'Requires user to tap "Allow from this source" when installing APK',
      'Requires marketing efforts to drive traffic to your landing page'
    ],
    description: 'Creating a custom mobile landing page on free web hosts (Vercel, Netlify, Cloudflare) provides the most professional direct-to-consumer distribution experience for Android apps.',
    bestFor: 'Direct selling, custom enterprise apps, niche tools, and indie developer portfolios.',
    websiteUrl: 'https://vercel.com',
    submissionGuideId: 'guide-direct-landing',
    popularApps: ['Epic Games App', 'Signal Direct Download', 'Telegram Direct APK', 'Bromite Browser']
  }
];
