import React from 'react';
import { Smartphone, Sparkles, Compass, Table, Code2, Layout, Calculator, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'notifyhub', label: '🔔 NotifyHub Portal', icon: Smartphone },
    { id: 'wizard', label: 'Store Finder Wizard', icon: Compass },
    { id: 'compare', label: 'Store Comparison', icon: Table },
    { id: 'guides', label: 'Step-by-Step Guides', icon: ShieldCheck },
    { id: 'landing-builder', label: 'Landing Page Builder', icon: Layout },
    { id: 'generators', label: 'Code Generators', icon: Code2 },
    { id: 'calculator', label: 'ROI & Savings', icon: Calculator },
    { id: 'ai-assistant', label: 'Ask AI Advisor', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('wizard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                  ZeroFee Android
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  $0 Play Store Alternative
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Deploy & Host Android Apps Without $25 Google Fee</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Advisor</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Nav */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 space-x-1 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
