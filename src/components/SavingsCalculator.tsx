import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ShieldCheck, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const [numApps, setNumApps] = useState<number>(1);
  const [expectedDownloads, setExpectedDownloads] = useState<number>(10000);
  const [inAppRevenue, setInAppRevenue] = useState<number>(5000); // $5000 projected in-app sales

  // Calculations
  const playRegistrationFee = numApps * 25; // $25 flat
  const appleFee = numApps * 99; // $99/year
  
  // Google Play takes 15% on first $1M or 30% standard
  const googleCommission = inAppRevenue * 0.15;
  const appleCommission = inAppRevenue * 0.30;
  
  // Total Google Play Cost
  const totalGoogleCost = playRegistrationFee + googleCommission;
  
  // Total Apple Cost
  const totalAppleCost = appleFee + appleCommission;

  // Total Free Alternative Cost ($0 account fee, ~2.9% standard Stripe processing if charging directly)
  const directStripeFee = inAppRevenue > 0 ? inAppRevenue * 0.029 : 0;
  const totalFreeCost = directStripeFee;

  const totalSavedVsGoogle = totalGoogleCost - totalFreeCost;

  return (
    <div id="calculator-section" className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Financial ROI Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          $0 Android Distribution Savings Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Calculate how much money you save by deploying on free alternative app stores & direct web channels instead of paying Google or Apple commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Your Project Parameters
          </h3>

          <div className="space-y-4 text-xs">
            {/* Number of Apps */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Number of Android Apps:</span>
                <span className="text-emerald-400">{numApps} App{numApps > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={numApps}
                onChange={(e) => setNumApps(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* In-App Revenue Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Projected Gross In-App Revenue ($):</span>
                <span className="text-emerald-400">${inAppRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={inAppRevenue}
                onChange={(e) => setInAppRevenue(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Downloads Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Expected Total Downloads:</span>
                <span className="text-slate-300">{expectedDownloads.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={5000}
                value={expectedDownloads}
                onChange={(e) => setExpectedDownloads(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-200">💡 Why Alternative Stores Save Money:</div>
              <div>• Google Play Console charges $25 flat registration + 15% to 30% cut on all in-app sales.</div>
              <div>• Direct APK / Amazon / F-Droid deployments cost $0 upfront and allow direct payment integration (e.g. Stripe, Patreon, PayPal) with ~2.9% fee.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparison Results */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Highlight Savings Banner */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/60 rounded-2xl p-6 text-center space-y-2 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Estimated Net Money Saved
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
              ${totalSavedVsGoogle.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-300">
              Money kept in your pocket by avoiding Google Play's $25 fee & 15% commission cut!
            </p>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detailed Platform Fee Breakdown
            </h4>

            <div className="space-y-2 text-xs">
              
              {/* Google Play */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Google Play Store</span>
                  <span className="text-[10px] text-slate-400">$25 account fee + 15% billing cut</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-red-400 font-bold block">${totalGoogleCost.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500">Platform Cost</span>
                </div>
              </div>

              {/* Apple App Store */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Apple App Store (iOS)</span>
                  <span className="text-[10px] text-slate-400">$99/yr account fee + 30% billing cut</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-amber-400 font-bold block">${totalAppleCost.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500">Platform Cost</span>
                </div>
              </div>

              {/* Free Alternative Channels */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-300 block">Amazon / F-Droid / Direct Web ($0 Fee)</span>
                  <span className="text-[10px] text-emerald-400/80">$0 account fee + standard direct payment processing</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-400 font-extrabold text-sm block">${totalFreeCost.toFixed(2)}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">100% Free Account</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
