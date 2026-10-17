import React, { useState } from 'react';
import { GUIDES_DATA } from '../data/guidesData';
import { DeploymentGuide, DeploymentGuideStep } from '../types';
import { ShieldCheck, Clock, Award, Copy, Check, Terminal, AlertTriangle, Lightbulb, ChevronRight, ExternalLink } from 'lucide-react';

interface GuidesSectionProps {
  initialGuideId?: string;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ initialGuideId }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(initialGuideId || 'guide-signing');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedGuide = GUIDES_DATA.find((g) => g.id === selectedGuideId) || GUIDES_DATA[0];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div id="guides-section" className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Tested & Verified Workflows</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Step-by-Step Android Publishing Guides
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed technical guides for building signed APKs, submitting to F-Droid & Amazon, and implementing auto-updates without Play Store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Guide Selector Menu */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
            Select Guide
          </span>

          <div className="space-y-1">
            {GUIDES_DATA.map((guide) => {
              const isSelected = guide.id === selectedGuide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold shadow-md'
                      : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold leading-tight">{guide.title}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{guide.timeEstimate}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{guide.difficulty}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Guide View */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Guide Header */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {selectedGuide.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedGuide.timeEstimate}</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedGuide.difficulty}</span>
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">{selectedGuide.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedGuide.summary}</p>

            {/* Prerequisites */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prerequisites</span>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                {selectedGuide.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guide Steps */}
          <div className="space-y-8">
            {selectedGuide.steps.map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                
                {/* Step Title */}
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Code Block if exists */}
                {step.codeSnippet && (
                  <div className="ml-10 space-y-1">
                    <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-t-xl border-t border-x border-slate-800 text-[10px] text-slate-400">
                      <span className="font-mono uppercase font-bold text-emerald-400">{step.codeLanguage || 'code'}</span>
                      <button
                        onClick={() => handleCopyCode(step.codeSnippet!, idx)}
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-b-xl border border-slate-800 overflow-x-auto">
                      <pre className="text-xs font-mono text-emerald-300 whitespace-pre leading-relaxed">
                        {step.codeSnippet}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Warning note if exists */}
                {step.warningNote && (
                  <div className="ml-10 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{step.warningNote}</span>
                  </div>
                )}

                {/* Tip if exists */}
                {step.tip && (
                  <div className="ml-10 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-xs flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                    <span><strong>Pro Tip: </strong>{step.tip}</span>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
