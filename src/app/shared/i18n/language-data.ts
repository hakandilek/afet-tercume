
import { UiLocaleData } from './ui-locale';
import { englishUi, turkishUi } from './ui-locales';
import { LanguageDetails } from './language-details';
import { arabic, english, french, german, greek, hebrew, italian, japanese, kurdish, russian, spanish, turkish, zaza } from './languages';
import { SupportedTranslationLocales } from "./supported-translation-locales";
import { SupportedUiLocales } from "./supported-ui-locales";

export const languageData: Record<SupportedTranslationLocales, LanguageDetails> = {
  [SupportedTranslationLocales.tr]: turkish,
  [SupportedTranslationLocales.ar]: arabic,
  [SupportedTranslationLocales.de]: german,
  [SupportedTranslationLocales.el]: greek,
  [SupportedTranslationLocales.en]: english,
  [SupportedTranslationLocales.es]: spanish,
  [SupportedTranslationLocales.fr]: french,
  [SupportedTranslationLocales.he]: hebrew,
  [SupportedTranslationLocales.it]: italian,
  [SupportedTranslationLocales.ja]: japanese,
  [SupportedTranslationLocales.ku]: kurdish,
  [SupportedTranslationLocales.ru]: russian,
  [SupportedTranslationLocales.zza]: zaza,
} as const;

export const uiLanguageData: Record<SupportedUiLocales, UiLocaleData> = {
  [SupportedTranslationLocales.tr]: turkishUi,
  [SupportedTranslationLocales.en]: englishUi,
} as const;
