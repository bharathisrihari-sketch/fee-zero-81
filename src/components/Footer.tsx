import React from 'react';
import { Smartphone, ShieldCheck, Github, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base">ZeroFee Android Publisher</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Helping developers around the world deploy, host, and monetize Android applications without paying Google Play's $25 registration fee or submitting to 14-day 20-tester delays.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Channels</h4>
            <ul className="text-xs space-y-1.5">
              <li><button onClick={() => onSelectTab('compare')} className="hover:text-emerald-400 transition-colors">Amazon Appstore ($0)</button></li>
              <li><button onClick={() => onSelectTab('compare')} className="hover:text-emerald-400 transition-colors">Samsung Galaxy Store</button></li>
              <li><button onClick={() => onSelectTab('compare')} className="hover:text-emerald-400 transition-colors">F-Droid (Open Source)</button></li>
              <li><button onClick={() => onSelectTab('compare')} className="hover:text-emerald-400 transition-colors">GitHub Releases Self-Host</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Developer Tools</h4>
            <ul className="text-xs space-y-1.5">
              <li><button onClick={() => onSelectTab('landing-builder')} className="hover:text-emerald-400 transition-colors">Direct APK Landing Builder</button></li>
              <li><button onClick={() => onSelectTab('generators')} className="hover:text-emerald-400 transition-colors">Gradle Release Generator</button></li>
              <li><button onClick={() => onSelectTab('calculator')} className="hover:text-emerald-400 transition-colors">ROI Savings Calculator</button></li>
              <li><button onClick={() => onSelectTab('ai-assistant')} className="hover:text-emerald-400 transition-colors">Ask Gemini AI Specialist</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} ZeroFee Android. Built for Android developers worldwide.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
            <span>for open distribution.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
