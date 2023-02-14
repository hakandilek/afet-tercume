import { SupportedLanguages } from '../constants/languages';

export interface TermsResponse {
  range: string;
  majorDimensions: string;
  values: string[][];
}

export interface Term {
  id: string;
  english: string;
  domain: string;
  translations: Record<SupportedLanguages, string>;
  initial: string;
}
