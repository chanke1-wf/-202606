export type ResultCategory = 'A' | 'B' | 'C' | 'D';

export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface DiagnosisResult {
  scoreRange: [number, number];
  title: string;
  subtitle: string;
  description: string;
  recommended: string;
  mainLead: string;
  mainCTA: string;
  ctaLink: string;
  otherOptions: string;
  subCtaLink?: string;
  subCtaText?: string;
  color: string;
  icon: string;
}

export type ScreenState = 'start' | 'playing' | 'result';

