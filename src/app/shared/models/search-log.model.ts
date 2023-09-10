import { SupportedTranslationLocales } from '../i18n';

export interface SearchLog {
  searchTerm: string,
  sourceLocale: SupportedTranslationLocales,
  targetLocale: SupportedTranslationLocales,
  created: Date,
  synced?: string,
  id: string
}
