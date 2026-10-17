export type PlatformType = 'alternative-store' | 'self-host' | 'pwa' | 'beta-test';

export interface StoreInfo {
  id: string;
  name: string;
  tagline: string;
  type: PlatformType;
  fee: string; // "$0" or "Free"
  openSourceOnly: boolean;
  userBase: string; // e.g. "100M+ active users", "200M+ Fire TV/Tablets"
  easeRating: 1 | 2 | 3 | 4 | 5; // 1 = hard, 5 = super easy
  autoUpdateSupport: boolean;
  inAppBilling: boolean;
  pros: string[];
  cons: string[];
  description: string;
  bestFor: string;
  websiteUrl: string;
  submissionGuideId: string;
  popularApps: string[];
}

export interface WizardAnswers {
  license: 'open-source' | 'closed-source' | 'not-sure';
  appCategory: 'game' | 'utility' | 'social' | 'enterprise' | 'privacy-focused';
  targetAudience: 'global' | 'niche-tech' | 'samsung-users' | 'amazon-devices' | 'internal-team';
  autoUpdateNeeded: boolean;
  monetization: 'free' | 'ads' | 'in-app-purchases' | 'donations';
  preferredComplexity: 'zero-config' | 'standard' | 'advanced';
}

export interface WizardResult {
  score: number;
  store: StoreInfo;
  reason: string;
}

export interface LandingPageConfig {
  appName: string;
  tagline: string;
  category: string;
  version: string;
  fileSize: string;
  downloadUrl: string;
  iconEmoji: string;
  primaryColor: string;
  developerName: string;
  minAndroidVersion: string;
  releaseNotes: string;
  screenshots: string[];
  featuresList: string[];
  githubRepoUrl: string;
  contactEmail: string;
}

export interface DeploymentGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
  codeLanguage?: string;
  warningNote?: string;
  tip?: string;
}

export interface DeploymentGuide {
  id: string;
  title: string;
  category: 'store' | 'self-host' | 'signing' | 'pwa' | 'updates';
  timeEstimate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  prerequisites: string[];
  steps: DeploymentGuideStep[];
}
