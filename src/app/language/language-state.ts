import { SupportedLanguages } from '../constants/languages';

export interface LanguageState {
  sourceLanguage: SupportedLanguages;
  targetLanguage: SupportedLanguages;
  uiLanguage: SupportedLanguages;
}
