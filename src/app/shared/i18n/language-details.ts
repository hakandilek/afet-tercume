import { SupportedTranslationLocales } from "./supported-translation-locales";

export interface LanguageDetails {
  /**
   * ISO 639-1, ISO 639-2 code of the language, preferably 639-1
   */
  isoCode: SupportedTranslationLocales;
  /**
   * Names of other languages in this language
   */
  otherLanguageNames: Record<SupportedTranslationLocales, string>;
  dataField: string;
  /**
   * set it to true if language is rtl
   */
  rtl?: boolean;
}
