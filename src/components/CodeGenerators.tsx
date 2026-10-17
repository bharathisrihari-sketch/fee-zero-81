import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Sparkles, FileCode, Wrench, Shield } from 'lucide-react';

export const CodeGenerators: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<'gradle' | 'fdroid' | 'autoupdate' | 'manifest'>('gradle');
  
  // State for Gradle generator
  const [gradleConfig, setGradleConfig] = useState({
    applicationId: 'com.mycompany.myfreeapp',
    versionName: '1.0.0',
    versionCode: '1',
    keystoreName: 'my-release-key.jks',
    keyAlias: 'my-alias',
    minSdk: '24',
    targetSdk: '34'
  });

  // State for F-Droid recipe
  const [fdroidConfig, setFdroidConfig] = useState({
    appId: 'com.mycompany.myfreeapp',
    appName: 'My Free Android App',
    license: 'MIT',
    githubRepo: 'https://github.com/myusername/myfreeapp',
    summary: 'Clean utility app for Android with zero ads'
  });

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Gradle code
  const getGradleSnippet = () => {
    return `// android/app/build.gradle.kts
android {
    namespace = "${gradleConfig.applicationId}"
    compileSdk = ${gradleConfig.targetSdk}

    defaultConfig {
        applicationId = "${gradleConfig.applicationId}"
        minSdk = ${gradleConfig.minSdk}
        targetSdk = ${gradleConfig.targetSdk}
        versionCode = ${gradleConfig.versionCode}
        versionName = "${gradleConfig.versionName}"
    }

    signingConfigs {
        create("release") {
            storeFile = file("${gradleConfig.keystoreName}")
            storePassword = System.getenv("KEYSTORE_PASSWORD") ?: "YOUR_STORE_PASSWORD"
            keyAlias = "${gradleConfig.keyAlias}"
            keyPassword = System.getenv("KEY_PASSWORD") ?: "YOUR_KEY_PASSWORD"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}`;
  };

  // Generate F-Droid YAML
  const getFdroidSnippet = () => {
    return `# metadata/${fdroidConfig.appId}.yml
Categories:
  - Utility
License: ${fdroidConfig.license}
AuthorName: Developer
SourceCode: ${fdroidConfig.githubRepo}
IssueTracker: ${fdroidConfig.githubRepo}/issues

AutoName: "${fdroidConfig.appName}"
Summary: "${fdroidConfig.summary}"
Description: |-
  A fast, lightweight, and 100% free Android application with zero ads
  and full offline functionality.

RepoType: git
Repo: ${fdroidConfig.githubRepo}.git

Builds:
  - versionName: ${gradleConfig.versionName}
    versionCode: ${gradleConfig.versionCode}
    commit: v${gradleConfig.versionName}
    subdir: app
    gradle:
      - yes

AutoUpdateMode: Version
UpdateCheckMode: Tags`;
  };

  // Generate Auto update snippet
  const getAutoUpdateSnippet = () => {
    return `// GitHub Auto-Update Checker for Non-Play Store APKs
import kotlinx.coroutines.*
import org.json.JSONObject
import java.net.URL

class AppUpdateManager(
    private val repoOwner: String,
    private val repoName: String,
    private val currentVersionName: String
) {
    fun checkForUpdates(onUpdateFound: (latestVersion: String, apkUrl: String) -> Unit) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val url = "https://api.github.com/repos/$repoOwner/$repoName/releases/latest"
                val response = URL(url).readText()
                val json = JSONObject(response)
                val latestTag = json.getString("tag_name") // e.g., "v1.1.0"
                val assets = json.getJSONArray("assets")

                if (latestTag != currentVersionName && assets.length() > 0) {
                    val apkDownloadUrl = assets.getJSONObject(0).getString("browser_download_url")
                    withContext(Dispatchers.Main) {
                        onUpdateFound(latestTag, apkDownloadUrl)
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}`;
  };

  const getActiveCode = () => {
    if (activeGenerator === 'gradle') return getGradleSnippet();
    if (activeGenerator === 'fdroid') return getFdroidSnippet();
    if (activeGenerator === 'autoupdate') return getAutoUpdateSnippet();
    return getGradleSnippet();
  };

  return (
    <div id="generators-section" className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Developer Tools</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Android Build & Metadata Generators
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Instantly generate production Gradle signing configs, F-Droid metadata build recipes, and Kotlin auto-update scripts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Generator Selector & Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          
          {/* Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveGenerator('gradle')}
              className={`py-2 rounded-xl transition-all ${
                activeGenerator === 'gradle' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gradle Signing
            </button>
            <button
              onClick={() => setActiveGenerator('fdroid')}
              className={`py-2 rounded-xl transition-all ${
                activeGenerator === 'fdroid' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              F-Droid Recipe
            </button>
            <button
              onClick={() => setActiveGenerator('autoupdate')}
              className={`py-2 rounded-xl transition-all ${
                activeGenerator === 'autoupdate' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto-Updater
            </button>
          </div>

          {/* Form Inputs based on generator */}
          {activeGenerator === 'gradle' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Gradle Config Parameters</h4>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Application ID (Package Name)</label>
                <input
                  type="text"
                  value={gradleConfig.applicationId}
                  onChange={(e) => setGradleConfig({ ...gradleConfig, applicationId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Version Name</label>
                  <input
                    type="text"
                    value={gradleConfig.versionName}
                    onChange={(e) => setGradleConfig({ ...gradleConfig, versionName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Version Code</label>
                  <input
                    type="text"
                    value={gradleConfig.versionCode}
                    onChange={(e) => setGradleConfig({ ...gradleConfig, versionCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Keystore File</label>
                  <input
                    type="text"
                    value={gradleConfig.keystoreName}
                    onChange={(e) => setGradleConfig({ ...gradleConfig, keystoreName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Key Alias</label>
                  <input
                    type="text"
                    value={gradleConfig.keyAlias}
                    onChange={(e) => setGradleConfig({ ...gradleConfig, keyAlias: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeGenerator === 'fdroid' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">F-Droid Recipe Metadata</h4>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Application Title</label>
                <input
                  type="text"
                  value={fdroidConfig.appName}
                  onChange={(e) => setFdroidConfig({ ...fdroidConfig, appName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">GitHub / GitLab Repository URL</label>
                <input
                  type="text"
                  value={fdroidConfig.githubRepo}
                  onChange={(e) => setFdroidConfig({ ...fdroidConfig, githubRepo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Open Source License</label>
                <select
                  value={fdroidConfig.license}
                  onChange={(e) => setFdroidConfig({ ...fdroidConfig, license: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="MIT">MIT License</option>
                  <option value="Apache-2.0">Apache 2.0</option>
                  <option value="GPL-3.0-only">GPL v3.0</option>
                  <option value="BSD-3-Clause">BSD 3-Clause</option>
                </select>
              </div>
            </div>
          )}

          {activeGenerator === 'autoupdate' && (
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">In-App Auto Update Logic</h4>
              <p>
                When publishing APKs outside of Google Play (e.g., via GitHub Releases or self-hosting), you can paste this Kotlin class into your project to query the latest GitHub release tag.
              </p>
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-emerald-300 text-[11px]">
                ✓ Requires 0 third-party SDK dependencies. Uses native Kotlin Coroutines & java.net.URL.
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Code Output */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-emerald-400">Generated Code Output</span>
            <button
              onClick={() => handleCopy(getActiveCode())}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto border border-slate-800 max-h-[480px]">
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre leading-relaxed">
              {getActiveCode()}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
