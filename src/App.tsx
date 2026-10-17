import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NotifyHubDeployer } from './components/NotifyHubDeployer';
import { WizardSection } from './components/WizardSection';
import { StoreComparison } from './components/StoreComparison';
import { LandingPageBuilder } from './components/LandingPageBuilder';
import { GuidesSection } from './components/GuidesSection';
import { CodeGenerators } from './components/CodeGenerators';
import { SavingsCalculator } from './components/SavingsCalculator';
import { AiConsultant } from './components/AiConsultant';
import { GeminiChatbotWidget } from './components/GeminiChatbotWidget';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('notifyhub');
  const [selectedGuideId, setSelectedGuideId] = useState<string | undefined>('guide-signing');
  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>(undefined);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
    setActiveTab('guides');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStore = (storeId: string) => {
    setSelectedStoreId(storeId);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Always display Hero Section on main entrance */}
        <HeroSection
          onStartWizard={() => {
            setActiveTab('wizard');
            const wizardElem = document.getElementById('wizard-section');
            if (wizardElem) wizardElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreStores={() => {
            setActiveTab('compare');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBuildLandingPage={() => {
            setActiveTab('landing-builder');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAi={() => {
            setActiveTab('ai-assistant');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Tab content rendering */}
        <div className="py-6">
          {activeTab === 'notifyhub' && (
            <NotifyHubDeployer />
          )}

          {activeTab === 'wizard' && (
            <WizardSection
              onSelectGuide={handleSelectGuide}
              onSelectStore={handleSelectStore}
            />
          )}

          {activeTab === 'compare' && (
            <StoreComparison
              onSelectGuide={handleSelectGuide}
              selectedStoreId={selectedStoreId}
            />
          )}

          {activeTab === 'guides' && (
            <GuidesSection initialGuideId={selectedGuideId} />
          )}

          {activeTab === 'landing-builder' && (
            <LandingPageBuilder />
          )}

          {activeTab === 'generators' && (
            <CodeGenerators />
          )}

          {activeTab === 'calculator' && (
            <SavingsCalculator />
          )}

          {activeTab === 'ai-assistant' && (
            <AiConsultant />
          )}
        </div>

      </main>

      {/* Floating Gemini AI Chatbot Widget */}
      <GeminiChatbotWidget />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

    </div>
  );
}
