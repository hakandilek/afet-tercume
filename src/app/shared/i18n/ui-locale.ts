import { UiLabels } from './ui-labels';
import { SupportedUiLocales } from "./supported-ui-locales";

export interface UiLocaleData {
  /**
   * ISO 639-1, ISO 639-2 code of the language, preferably 639-1
   */
  isoCode: SupportedUiLocales;
  /**
   * set it to true if language is rtl
   */
  rtl?: boolean;

  labels: UiLabels;
}

export interface UiLocale extends UiLocaleData {
  alt?: UiLocaleData
}
