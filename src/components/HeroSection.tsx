import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, Zap, ArrowRight, DollarSign, ExternalLink, Sparkles, Download, Layers } from 'lucide-react';

interface HeroSectionProps {
  onStartWizard: () => void;
  onExploreStores: () => void;
  onBuildLandingPage: () => void;
  onOpenAi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartWizard,
  onExploreStores,
  onBuildLandingPage,
  onOpenAi
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80 pt-10 pb-12">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Bypass the $25 Google Play Fee & 14-Day Tester Rule</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Deploy & Publish Your Android App for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">$0 Completely Free</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don't let Google Play's $25 developer registration fee or strict account verification block your release. Reach millions of users globally via <strong>Amazon Appstore</strong>, <strong>Samsung Galaxy Store</strong>, <strong>F-Droid</strong>, <strong>GitHub Releases</strong>, or an installable <strong>PWA</strong> with total ownership.
            </p>

            {/* Quick Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start space-x-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Zero Registration Fees</h4>
                  <p className="text-xs text-slate-400">$0 cost on Amazon, Samsung, F-Droid & GitHub.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Instant Worldwide Deployment</h4>
                  <p className="text-xs text-slate-400">Skip the 20-tester requirement & long approval delays.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Keep 100% Monetization</h4>
                  <p className="text-xs text-slate-400">No mandatory 30% Google billing commission.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Automated In-App Updates</h4>
                  <p className="text-xs text-slate-400">Push background updates directly from GitHub or web.</p>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartWizard}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5"
              >
                <span>Find Best Store For My App</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreStores}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Compare 10+ Free Stores</span>
              </button>

              <button
                onClick={onBuildLandingPage}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Build APK Download Site</span>
              </button>
            </div>
          </div>

          {/* Interactive Comparison Card Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Distribution Cost Comparison</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Save 100% Money
                </span>
              </div>

              <div className="space-y-3 my-4">
                {/* Google Play Store standard */}
                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-800/30 flex items-center justify-between opacity-80">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-900/40 flex items-center justify-center text-red-400 font-bold text-xs">
                      GP
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200">Google Play Console</div>
                      <div className="text-xs text-red-400 font-medium">Requires 20 testers for 14 days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-red-400">$25.00</span>
                    <span className="block text-[10px] text-slate-400">Fee + 15-30% Cut</span>
                  </div>
                </div>

                {/* Apple Developer */}
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-center justify-between opacity-80">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-900/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                      iOS
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200">Apple App Store</div>
                      <div className="text-xs text-amber-400 font-medium">Annual recurring subscription</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-amber-400">$99.00/yr</span>
                    <span className="block text-[10px] text-slate-400">Recurring + 30% Cut</span>
                  </div>
                </div>

                {/* Free Channels Highlight */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/40 relative overflow-hidden shadow-lg shadow-emerald-950/30">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-bl-lg uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">
                        $0
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">No-Fee Android Channels</div>
                        <div className="text-xs text-emerald-300 font-medium">Amazon, Samsung, F-Droid & Web</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-400">$0.00</span>
                      <span className="block text-[10px] text-emerald-300">100% Free Forever</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Helper Banner inside widget */}
              <div 
                onClick={onOpenAi}
                className="mt-4 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs text-slate-200 font-medium">Have a specific question about signing or store guidelines?</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">Ask AI &rarr;</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
