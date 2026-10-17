import React, { useState } from 'react';
import { Smartphone, Download, Check, Copy, ExternalLink, ShieldAlert, Sparkles, Terminal, Play, Globe, CheckCircle2, QrCode } from 'lucide-react';

export const NotifyHubDeployer: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'sideload' | 'pwa' | 'amazon' | 'playstore'>('sideload');

  const appDetails = {
    name: 'NotifyHub',
    appId: 'com.notifyhub.app',
    version: 'v1.0.0',
    fileSize: '14.2 MB',
    tagline: 'Unified notification manager, alert aggregator, and real-time push center for Android.',
    apkDownloadUrl: 'https://github.com/notifyhub/notifyhub-android/releases/download/v1.0.0/NotifyHub-v1.0.0.apk',
    pwaUrl: 'https://notifyhub.app',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.notifyhub.app',
    playStoreIntent: 'market://details?id=com.notifyhub.app'
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const gradleSnippet = `// android/app/build.gradle.kts for NotifyHub
android {
    namespace = "com.notifyhub.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.notifyhub.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        create("release") {
            storeFile = file("notifyhub-key.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD") ?: "NotifyHubKey123"
            keyAlias = "notifyhub"
            keyPassword = System.getenv("KEY_PASSWORD") ?: "NotifyHubKey123"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`;

  const fdroidSnippet = `# metadata/com.notifyhub.app.yml
Categories:
  - Utility
License: Apache-2.0
AuthorName: NotifyHub Open Team
SourceCode: https://github.com/notifyhub/notifyhub-android
IssueTracker: https://github.com/notifyhub/notifyhub-android/issues

AutoName: "NotifyHub"
Summary: "Unified Notification & Alert Aggregator for Android"
Description: |-
  NotifyHub brings all your notifications, system alerts, webhooks, and push messages
  into one clean, private, and customizable dashboard.

RepoType: git
Repo: https://github.com/notifyhub/notifyhub-android.git

Builds:
  - versionName: 1.0.0
    versionCode: 1
    commit: v1.0.0
    subdir: app
    gradle:
      - yes

AutoUpdateMode: Version
UpdateCheckMode: Tags`;

  return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* App Specific Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20 shrink-0 font-black text-slate-950">
              🔔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{appDetails.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Ready for $0 Deployment
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{appDetails.tagline}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                <span>Package: <strong>{appDetails.appId}</strong></span>
                <span>•</span>
                <span>Version: <strong>{appDetails.version}</strong></span>
                <span>•</span>
                <span>Size: <strong>{appDetails.fileSize}</strong></span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <a
              href={appDetails.apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download NotifyHub APK</span>
            </a>
          </div>
        </div>
      </div>

      {/* HOW TO OPEN & INSTALL NOTIFYHUB ON ANDROID */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="pb-4 border-b border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Installation & Opening Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            How to Install & Open NotifyHub on Your Android Device
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose how you want to open NotifyHub on your phone without paying Google Play fees.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setSelectedMethod('sideload')}
            className={`py-2.5 px-3 rounded-xl transition-all ${
              selectedMethod === 'sideload' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Direct APK Sideload ($0)
          </button>
          <button
            onClick={() => setSelectedMethod('pwa')}
            className={`py-2.5 px-3 rounded-xl transition-all ${
              selectedMethod === 'pwa' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Web / PWA Install ($0)
          </button>
          <button
            onClick={() => setSelectedMethod('amazon')}
            className={`py-2.5 px-3 rounded-xl transition-all ${
              selectedMethod === 'amazon' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Amazon Store ($0)
          </button>
          <button
            onClick={() => setSelectedMethod('playstore')}
            className={`py-2.5 px-3 rounded-xl transition-all ${
              selectedMethod === 'playstore' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Google Play Deep Link
          </button>
        </div>

        {/* Method 1: Sideloading */}
        {selectedMethod === 'sideload' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
              ⚡ <strong>Recommended Free Method:</strong> Direct APK download requires zero developer fee and installs on any Android phone (Samsung, Xiaomi, Pixel, OnePlus, Motorola, etc.).
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="font-bold text-white">Download APK</h4>
                <p className="text-slate-400">Open Chrome on Android and download <code>NotifyHub-v1.0.0.apk</code>.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="font-bold text-white">Tap Open File</h4>
                <p className="text-slate-400">Tap the downloaded notification banner or open your File Manager app.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="font-bold text-white">Allow Source</h4>
                <p className="text-slate-400">If Android blocks it, tap <strong>Settings</strong> & toggle <strong>"Allow from this source"</strong>.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                  4
                </div>
                <h4 className="font-bold text-white">Tap Install & Open</h4>
                <p className="text-slate-400">Tap <strong>Install</strong>. Once done, tap <strong>Open</strong> to launch NotifyHub from your home screen!</p>
              </div>

            </div>
          </div>
        )}

        {/* Method 2: PWA */}
        {selectedMethod === 'pwa' && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <p className="text-slate-300">
              Progressive Web Apps allow Android users to add <strong>NotifyHub</strong> directly to their phone's home screen directly from Chrome or Edge without any APK download or store approval!
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white">Steps to install NotifyHub PWA:</h4>
              <ol className="list-decimal list-inside text-slate-300 space-y-1">
                <li>Open <strong>Chrome</strong> on Android and go to <code>https://notifyhub.app</code>.</li>
                <li>Tap the <strong>three dots (⋮)</strong> in Chrome's top right corner.</li>
                <li>Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.</li>
                <li>The <strong>NotifyHub</strong> app icon will instantly appear in your Android app drawer!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Method 3: Amazon */}
        {selectedMethod === 'amazon' && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <p className="text-slate-300">
              If you publish NotifyHub to the <strong>Amazon Appstore</strong> ($0 developer account fee), users can open it via the Amazon Appstore app:
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white">How users open from Amazon Appstore:</h4>
              <ol className="list-decimal list-inside text-slate-300 space-y-1">
                <li>Open <strong>Amazon Appstore</strong> app on Android or Fire Tablet.</li>
                <li>Search for <strong>"NotifyHub"</strong> in the search bar.</li>
                <li>Tap <strong>Get / Install</strong>.</li>
                <li>Tap <strong>Open</strong> to launch!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Method 4: Play Store Deep Link */}
        {selectedMethod === 'playstore' && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <p className="text-slate-300">
              If you eventually decide to pay Google's $25 fee and publish on Google Play Store, here are the exact deep links and intent URLs to open <strong>NotifyHub</strong> directly in the Android Google Play Store app:
            </p>

            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">1. Standard Web Play Store URL:</span>
                <code className="block bg-slate-900 p-2 rounded-lg text-slate-200 font-mono select-all">
                  {appDetails.playStoreUrl}
                </code>
                <button
                  onClick={() => handleCopy(appDetails.playStoreUrl, 'weburl')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-bold"
                >
                  {copiedSection === 'weburl' ? 'Copied URL!' : 'Copy Play Store URL'}
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">2. Android Native Market Intent URI (Opens Play Store App Directly on Phone):</span>
                <code className="block bg-slate-900 p-2 rounded-lg text-slate-200 font-mono select-all">
                  {appDetails.playStoreIntent}
                </code>
                <p className="text-slate-400 text-[11px]">
                  💡 <strong>In Android Code / HTML:</strong> <code>&lt;a href="market://details?id=com.notifyhub.app"&gt;Open in Play Store&lt;/a&gt;</code>
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* NOTIFYHUB READY-TO-USE CODE & METADATA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gradle */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">NotifyHub Gradle Config</span>
            <button
              onClick={() => handleCopy(gradleSnippet, 'gradle')}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold"
            >
              {copiedSection === 'gradle' ? 'Copied!' : 'Copy Gradle'}
            </button>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{gradleSnippet}</pre>
          </div>
        </div>

        {/* F-Droid Recipe */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">NotifyHub F-Droid Recipe</span>
            <button
              onClick={() => handleCopy(fdroidSnippet, 'fdroid')}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold"
            >
              {copiedSection === 'fdroid' ? 'Copied!' : 'Copy YAML'}
            </button>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{fdroidSnippet}</pre>
          </div>
        </div>

      </div>

    </div>
  );
};
