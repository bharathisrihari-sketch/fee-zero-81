import React, { useState } from 'react';
import { LandingPageConfig } from '../types';
import { Download, Smartphone, QrCode, Copy, Check, Eye, Code, Sparkles, ShieldAlert, ArrowDown, ExternalLink, RefreshCw } from 'lucide-react';

export const LandingPageBuilder: React.FC = () => {
  const [config, setConfig] = useState<LandingPageConfig>({
    appName: 'Aura Speed Booster & Privacy',
    tagline: 'Lightning fast, ad-free system optimization tool for Android.',
    category: 'Tools & Utilities',
    version: 'v1.4.0',
    fileSize: '18.4 MB',
    downloadUrl: 'https://github.com/example/aura-android/releases/download/v1.4.0/aura-release.apk',
    iconEmoji: '⚡',
    primaryColor: '#10b981', // emerald-500
    developerName: 'Aura Open Labs',
    minAndroidVersion: 'Android 8.0 (API 26) or higher',
    releaseNotes: '• Added dark mode support\n• Reduced memory usage by 30%\n• Improved battery optimization algorithms\n• Fixed background widget sync bug',
    screenshots: [
      'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=400&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80'
    ],
    featuresList: [
      'Zero Ads & Zero Tracking',
      'Full Offline Functionality',
      'Instant One-Tap Memory Cleaner',
      'Battery Guard & Deep Sleep Controls'
    ],
    githubRepoUrl: 'https://github.com/example/aura-android',
    contactEmail: 'support@aura-app.org'
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'export'>('preview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Generate standalone HTML template string
  const generateExportHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Download ${config.appName} for Android (.apk)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between p-4 sm:p-8">
  <div class="max-w-2xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl my-auto">
    <!-- App Header -->
    <div class="flex items-center space-x-4 mb-6">
      <div class="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
        ${config.iconEmoji}
      </div>
      <div>
        <h1 class="text-2xl font-extrabold text-white">${config.appName}</h1>
        <p class="text-xs text-slate-400 font-medium">${config.developerName} • ${config.category}</p>
        <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          ${config.version} (${config.fileSize})
        </span>
      </div>
    </div>

    <p class="text-slate-300 text-sm leading-relaxed mb-6">
      ${config.tagline}
    </p>

    <!-- Download CTA -->
    <div class="space-y-3 mb-8">
      <a
        href="${config.downloadUrl}"
        download
        class="flex items-center justify-center space-x-2 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 transition-all text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download Release APK (${config.fileSize})</span>
      </a>
      <p class="text-[11px] text-center text-slate-400">
        Requires ${config.minAndroidVersion} • Clean & Virus-Free
      </p>
    </div>

    <!-- Release Notes -->
    <div class="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-6">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">What's New in ${config.version}</h3>
      <pre class="text-xs text-slate-400 font-sans whitespace-pre-wrap leading-relaxed">${config.releaseNotes}</pre>
    </div>

    <!-- How to Install -->
    <div class="border-t border-slate-800 pt-6 space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
        <span>Installation Instructions for Android</span>
      </h3>
      <ol class="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
        <li>Tap <strong>Download APK</strong> above and wait for completion.</li>
        <li>Open your browser downloads or file manager and tap <strong>${config.appName}.apk</strong>.</li>
        <li>If prompted, tap <strong>Settings</strong> and enable <strong>"Allow from this source"</strong>.</li>
        <li>Tap <strong>Install</strong> to complete setup!</li>
      </ol>
    </div>
  </div>

  <footer class="text-center text-xs text-slate-500 py-4">
    Provided free by ${config.developerName} • Direct Download
  </footer>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportHtml());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="landing-builder-section" className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Direct APK Landing Page Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Design a custom mobile download web page for your APK. Includes sideloading instructions, QR code scanner, and ready-to-deploy HTML code.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'preview' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Mobile Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'edit' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Edit App Info</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'export' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export HTML Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Config Form */}
        <div className={`lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            App Details & Links
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">App Name</label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 font-bold block mb-1">App Icon Emoji</label>
                <input
                  type="text"
                  value={config.iconEmoji}
                  onChange={(e) => setConfig({ ...config, iconEmoji: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-center"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Developer / Org</label>
                <input
                  type="text"
                  value={config.developerName}
                  onChange={(e) => setConfig({ ...config, developerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">App Tagline / Summary</label>
              <textarea
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Version Name</label>
                <input
                  type="text"
                  value={config.version}
                  onChange={(e) => setConfig({ ...config, version: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">APK File Size</label>
                <input
                  type="text"
                  value={config.fileSize}
                  onChange={(e) => setConfig({ ...config, fileSize: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Direct APK Download URL</label>
              <input
                type="text"
                value={config.downloadUrl}
                onChange={(e) => setConfig({ ...config, downloadUrl: e.target.value })}
                placeholder="https://github.com/user/repo/releases/download/v1.0/app.apk"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Release Notes</label>
              <textarea
                value={config.releaseNotes}
                onChange={(e) => setConfig({ ...config, releaseNotes: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Preview / Export */}
        <div className="lg:col-span-7">
          
          {activeTab === 'export' ? (
            /* Export Code View */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Single-File Mobile Download Landing Page (HTML + Tailwind)</h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy HTML Code'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto border border-slate-800 max-h-[500px]">
                <pre className="text-[11px] font-mono text-emerald-300 whitespace-pre-wrap">{generateExportHtml()}</pre>
              </div>

              <p className="text-xs text-slate-400">
                💡 <strong>How to host for free ($0):</strong> Save this code as <code>index.html</code> and upload to <strong>GitHub Pages</strong>, <strong>Vercel</strong>, or <strong>Netlify</strong>. Your site will be live instantly!
              </p>
            </div>
          ) : (
            /* Live Interactive Preview View */
            <div className="bg-slate-950 border-4 border-slate-800 rounded-[3rem] p-4 sm:p-6 shadow-2xl max-w-md mx-auto relative overflow-hidden">
              
              {/* Phone Status Bar Simulation */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-4 pb-4">
                <span>9:41</span>
                <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
                <span>100% ⚡</span>
              </div>

              {/* Download Web Page Content */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                
                {/* Header */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
                    {config.iconEmoji}
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white leading-tight">{config.appName}</h2>
                    <p className="text-[11px] text-slate-400 font-medium">{config.developerName}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {config.version} • {config.fileSize}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {config.tagline}
                </p>

                {/* Main CTA Download Button */}
                <a
                  href={config.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Release APK ({config.fileSize})</span>
                </a>

                {/* Features Pill */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Features</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {config.featuresList.map((f, i) => (
                      <div key={i} className="text-[10px] text-slate-300 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 truncate">
                        ✓ {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Release Notes */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Release Notes</span>
                  <p className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">{config.releaseNotes}</p>
                </div>

                {/* Sideloading Instructions */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Android Sideload Guide</span>
                  </span>
                  <ol className="text-[10px] text-slate-300 space-y-1 list-decimal list-inside leading-tight">
                    <li>Tap <strong>Download APK</strong> above.</li>
                    <li>Open downloaded <code>.apk</code> file.</li>
                    <li>Enable <strong>"Allow from this source"</strong> in settings.</li>
                    <li>Tap <strong>Install</strong>!</li>
                  </ol>
                </div>

              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-slate-500">
                  📱 Live Mobile View Simulation • Ready to Deploy
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
