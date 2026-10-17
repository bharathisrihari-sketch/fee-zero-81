import React, { useState } from 'react';
import { WizardAnswers } from '../types';
import { STORES_DATA } from '../data/storesData';
import { Compass, CheckCircle2, ArrowRight, RotateCcw, Sparkles, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface WizardSectionProps {
  onSelectGuide: (guideId: string) => void;
  onSelectStore: (storeId: string) => void;
}

export const WizardSection: React.FC<WizardSectionProps> = ({ onSelectGuide, onSelectStore }) => {
  const [answers, setAnswers] = useState<WizardAnswers>({
    license: 'closed-source',
    appCategory: 'utility',
    targetAudience: 'global',
    autoUpdateNeeded: true,
    monetization: 'free',
    preferredComplexity: 'standard'
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
  };

  // Compute recommendation scores based on wizard answers
  const getRecommendations = () => {
    return STORES_DATA.map((store) => {
      let score = 70; // baseline score
      const reasons: string[] = [];

      // Open source check
      if (answers.license === 'open-source') {
        if (store.id === 'f-droid') {
          score += 30;
          reasons.push('Ideal fit: F-Droid automatically compiles open-source code directly from GitHub/GitLab.');
        } else if (store.id === 'github-releases') {
          score += 25;
          reasons.push('Perfect match for open-source GitHub releases with high developer visibility.');
        }
      } else if (answers.license === 'closed-source') {
        if (store.id === 'f-droid') {
          score -= 50; // F-Droid requires open source
        } else if (store.id === 'amazon-appstore') {
          score += 25;
          reasons.push('Supports closed-source commercial apps with zero registration fees.');
        } else if (store.id === 'samsung-galaxy-store') {
          score += 20;
          reasons.push('Free seller account for proprietary commercial Android apps.');
        }
      }

      // Target Audience
      if (answers.targetAudience === 'amazon-devices') {
        if (store.id === 'amazon-appstore') {
          score += 35;
          reasons.push('Pre-installed on all Fire OS tablets, Fire TV sticks, and Echo Show devices.');
        }
      } else if (answers.targetAudience === 'samsung-users') {
        if (store.id === 'samsung-galaxy-store') {
          score += 35;
          reasons.push('Direct access to 1 Billion+ pre-installed Samsung Galaxy hardware users.');
        }
      } else if (answers.targetAudience === 'niche-tech') {
        if (store.id === 'f-droid' || store.id === 'github-releases') {
          score += 25;
          reasons.push('Extremely popular among power users, developers, and tech enthusiasts.');
        }
      } else if (answers.targetAudience === 'internal-team') {
        if (store.id === 'firebase-app-distribution' || store.id === 'direct-web-hosting') {
          score += 30;
          reasons.push('Instant email or web link distribution for internal testing and client builds.');
        }
      }

      // Category
      if (answers.appCategory === 'game') {
        if (store.id === 'taptap') {
          score += 30;
          reasons.push('TapTap is the world’s leading mobile gaming community with zero listing fees.');
        } else if (store.id === 'amazon-appstore') {
          score += 20;
          reasons.push('Huge gaming library distribution on Fire TV & Fire Tablets.');
        }
      }

      // Auto update preference
      if (answers.autoUpdateNeeded) {
        if (store.autoUpdateSupport) {
          score += 10;
        }
      }

      return {
        store,
        score: Math.min(100, Math.max(10, score)),
        mainReason: reasons[0] || 'Matches your deployment requirements with $0 platform registration fee.'
      };
    }).sort((a, b) => b.score - a.score);
  };

  const recommendations = getRecommendations();
  const topPick = recommendations[0];
  const runnersUp = recommendations.slice(1, 4);

  return (
    <div id="wizard-section" className="max-w-5xl mx-auto my-8 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Find Your Ideal Free Android Deployment Path</h2>
              <p className="text-xs text-slate-400">Answer 4 quick questions to get tailored $0 publishing channels.</p>
            </div>
          </div>

          {showResults && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>

        {!showResults ? (
          <div className="mt-6 space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>

            {/* Question 1: License */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-white">1. Is your Android app Open Source or Closed Source?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'open-source', title: 'Open Source (FOSS)', desc: 'Source code is public on GitHub/GitLab with an open license (MIT, Apache, GPL).' },
                    { id: 'closed-source', title: 'Proprietary / Closed Source', desc: 'Code is private or commercial. You hold full intellectual property.' },
                    { id: 'not-sure', title: 'Not Sure / Hybrid', desc: 'SaaS app, mixed codebase, or open frontend with proprietary backend.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, license: opt.id as any })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        answers.license === opt.id
                          ? 'bg-emerald-500/10 border-emerald-500/80 ring-2 ring-emerald-500/30'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{opt.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2: Category */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-white">2. What type of Android application are you building?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'game', title: 'Mobile Game', desc: 'Indie game, 2D/3D action, arcade, RPG, casual puzzle.' },
                    { id: 'utility', title: 'Utility / Productivity Tool', desc: 'File manager, calculator, task planner, system tool.' },
                    { id: 'privacy-focused', title: 'Privacy & Dev Tool', desc: 'VPN, encryption tool, ad blocker, developer utility.' },
                    { id: 'social', title: 'Social & Media / SaaS', desc: 'Content streaming, community, chat, social media frontend.' },
                    { id: 'enterprise', title: 'Internal / Enterprise App', desc: 'Client portal, employee dashboard, inventory scanner.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, appCategory: opt.id as any })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        answers.appCategory === opt.id
                          ? 'bg-emerald-500/10 border-emerald-500/80 ring-2 ring-emerald-500/30'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{opt.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3: Audience */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-white">3. Who is your primary target audience or device ecosystem?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'global', title: 'Global Android Users', desc: 'General public with any Android phone (Samsung, Xiaomi, Pixel, Motorola).' },
                    { id: 'samsung-users', title: 'Samsung Galaxy Users', desc: 'Optimized for Samsung hardware, OneUI, or Galaxy ecosystem.' },
                    { id: 'amazon-devices', title: 'Amazon Fire Tablets / TV', desc: 'Fire OS tablets, Fire TV stick, smart TVs, Windows 11.' },
                    { id: 'niche-tech', title: 'Tech & Power Users', desc: 'Power users comfortable downloading APKs or using F-Droid.' },
                    { id: 'internal-team', title: 'Private Beta / Internal Team', desc: 'Colleagues, QA testers, clients, or internal company deployment.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, targetAudience: opt.id as any })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        answers.targetAudience === opt.id
                          ? 'bg-emerald-500/10 border-emerald-500/80 ring-2 ring-emerald-500/30'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{opt.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 4: Updates & Monetization */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-white">4. What are your auto-update & monetization needs?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-200 block uppercase tracking-wider">In-App Background Updates</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAnswers({ ...answers, autoUpdateNeeded: true })}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                          answers.autoUpdateNeeded
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Yes, auto-update app
                      </button>
                      <button
                        onClick={() => setAnswers({ ...answers, autoUpdateNeeded: false })}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                          !answers.autoUpdateNeeded
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Manual downloads ok
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-200 block uppercase tracking-wider">Monetization Strategy</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'free', label: '100% Free' },
                        { id: 'donations', label: 'Donations / Github Sponsors' },
                        { id: 'ads', label: 'AdMob / Unity Ads' },
                        { id: 'in-app-purchases', label: 'Custom Payments / Stripe' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setAnswers({ ...answers, monetization: m.id as any })}
                          className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                            answers.monetization === m.id
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 font-bold'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
                >
                  Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-2.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shadow-lg shadow-emerald-500/20"
              >
                <span>{currentStep === totalSteps ? 'See My Top Free Stores' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tailored Free Publishing Strategy</span>
              </span>
              <h3 className="text-2xl font-extrabold text-white">Your Best $0 Android Deployment Stack</h3>
              <p className="text-xs text-slate-400">Based on your answers, here are your top fee-free Android distribution channels.</p>
            </div>

            {/* Top Pick Banner */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-bl-xl">
                #1 RECOMMENDED MATCH ({topPick.score}% FIT)
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-extrabold text-white">{topPick.store.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {topPick.store.fee}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-300 font-medium leading-relaxed">
                    "{topPick.mainReason}"
                  </p>
                  <p className="text-xs text-slate-300">
                    {topPick.store.description}
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => onSelectGuide(topPick.store.submissionGuideId)}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>View Step-by-Step Guide</span>
                  </button>
                  <a
                    href={topPick.store.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl border border-slate-700"
                  >
                    <span>Visit Developer Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Runners Up Grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Strong Alternative Free Channels</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {runnersUp.map((item, idx) => (
                  <div key={item.store.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">#{idx + 2} {item.store.name}</span>
                        <span className="text-[10px] font-bold text-emerald-400">{item.score}% Match</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.store.tagline}</p>
                    </div>

                    <button
                      onClick={() => onSelectStore(item.store.id)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold rounded-lg transition-all"
                    >
                      View Details & Guides
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
