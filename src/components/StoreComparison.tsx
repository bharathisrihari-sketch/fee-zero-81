import React, { useState } from 'react';
import { STORES_DATA } from '../data/storesData';
import { StoreInfo, PlatformType } from '../types';
import { Search, Filter, ExternalLink, Check, X, ShieldCheck, Star, Users, ArrowUpRight, Zap, RefreshCw, CreditCard } from 'lucide-react';

interface StoreComparisonProps {
  onSelectGuide: (guideId: string) => void;
  selectedStoreId?: string;
}

export const StoreComparison: React.FC<StoreComparisonProps> = ({ onSelectGuide, selectedStoreId }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'ease' | 'users' | 'name'>('users');

  const filteredStores = STORES_DATA.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.bestFor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || store.type === filterType;

    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'ease') {
      return b.easeRating - a.easeRating;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div id="compare-section" className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>100% Free - $0 Account Fee Guaranteed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Alternative Android Distribution Channels
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare store reach, review speed, auto-update support, and monetization features for all fee-free publishing paths.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center space-x-3 text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-xl shrink-0">
          <div>
            <span className="font-extrabold text-white text-sm block">{STORES_DATA.length}</span>
            <span className="text-slate-400 text-[10px]">Free Platforms</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="font-extrabold text-emerald-400 text-sm block">$0.00</span>
            <span className="text-slate-400 text-[10px]">Total Upfront Cost</span>
          </div>
        </div>
      </div>

      {/* Controls: Search, Filter, Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stores or features (e.g. Amazon, F-Droid)..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-100 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'alternative-store', label: 'App Stores' },
            { id: 'self-host', label: 'Self-Hosting / GitHub' },
            { id: 'pwa', label: 'PWA / Web' },
            { id: 'beta-test', label: 'Beta Testing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2 shrink-0 text-xs text-slate-400 w-full sm:w-auto justify-end">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2.5 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500"
          >
            <option value="users">User Base / Reach</option>
            <option value="ease">Ease of Publishing</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => {
          const isHighlighted = selectedStoreId === store.id;

          return (
            <div
              key={store.id}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:border-emerald-500/50 shadow-lg ${
                isHighlighted ? 'border-2 border-emerald-500 bg-slate-900/90 ring-4 ring-emerald-500/10' : 'border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{store.name}</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {store.fee}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium capitalize">
                        {store.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Ease Rating */}
                  <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-200">{store.easeRating}/5</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {store.tagline}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">User Reach</span>
                    <span className="font-bold text-slate-200 truncate block">{store.userBase}</span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">In-App Auto Updates</span>
                    <span className={`font-bold block ${store.autoUpdateSupport ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {store.autoUpdateSupport ? 'Supported ✓' : 'Manual Install'}
                    </span>
                  </div>
                </div>

                {/* Pros List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Highlights</span>
                  {store.pros.slice(0, 3).map((pro, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Best For Note */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px]">
                  <span className="font-bold text-emerald-400">Best for: </span>
                  <span className="text-slate-300">{store.bestFor}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onSelectGuide(store.submissionGuideId)}
                  className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/10"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>View Guide</span>
                </button>

                <a
                  href={store.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all"
                  title="Visit official portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
