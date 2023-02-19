import { SupportedTranslationLocales } from '../shared/i18n';

export interface TermsResponse {
  range: string;
  majorDimensions: string;
  values: string[][];
}

export interface Term {
  id: string;
  english: string;
  domain: string;
  translations: Record<SupportedTranslationLocales, string>;
  initial: string;
}
