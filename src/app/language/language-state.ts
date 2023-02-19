import { SupportedTranslationLocales } from "../shared/i18n/supported-translation-locales";

export interface LanguageState {
  sourceLanguage: SupportedTranslationLocales;
  targetLanguage: SupportedTranslationLocales;
}
