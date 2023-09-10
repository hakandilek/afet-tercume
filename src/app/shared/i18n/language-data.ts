
import { UiLocaleData } from './ui-locale';
import { englishUi, turkishUi } from './ui-locales';
import { LanguageDetails } from './language-details';
import { albanian, arabic, armenian, bulgarian, czech, dutch, english, finnish, french, german, greek, hebrew, hindi,
  hungarian, italian, japanese, korean, kurdish, macedonian, persian, polish, portuguese, romanian, russian, serbian,
  simplifiedChinese, spanish, swedish, traditionalChinese, turkish, zaza } from './languages';
import { SupportedTranslationLocales } from "./supported-translation-locales";
import { SupportedUiLocales } from "./supported-ui-locales";

export const languageData: Record<SupportedTranslationLocales, LanguageDetails> = {
  [SupportedTranslationLocales.en]: english,
  [SupportedTranslationLocales.tr]: turkish,
  [SupportedTranslationLocales.es]: spanish,
  [SupportedTranslationLocales.de]: german,
  [SupportedTranslationLocales.ru]: russian,
  [SupportedTranslationLocales.fr]: french,
  [SupportedTranslationLocales.ku]: kurdish,
  [SupportedTranslationLocales.zza]: zaza,
  [SupportedTranslationLocales.ar]: arabic,
  [SupportedTranslationLocales.el]: greek,
  [SupportedTranslationLocales.ja]: japanese,
  [SupportedTranslationLocales.he]: hebrew,
  [SupportedTranslationLocales.it]: italian,
  [SupportedTranslationLocales.hy]: armenian,
  [SupportedTranslationLocales.nl]: dutch,
  [SupportedTranslationLocales.zhHans]: simplifiedChinese,
  [SupportedTranslationLocales.zhHant]: traditionalChinese,
  [SupportedTranslationLocales.bg]: bulgarian,
  [SupportedTranslationLocales.ko]: korean,
  [SupportedTranslationLocales.fa]: persian,
  [SupportedTranslationLocales.hi]: hindi,
  [SupportedTranslationLocales.pt]: portuguese,
  [SupportedTranslationLocales.sv]: swedish,
  [SupportedTranslationLocales.ro]: romanian,
  [SupportedTranslationLocales.sr]: serbian,
  [SupportedTranslationLocales.mk]: macedonian,
  [SupportedTranslationLocales.hu]: hungarian,
  [SupportedTranslationLocales.fi]: finnish,
  [SupportedTranslationLocales.sq]: albanian,
  [SupportedTranslationLocales.cs]: czech,
  [SupportedTranslationLocales.pl]: polish
} as const;

export const uiLanguageData: Record<SupportedUiLocales, UiLocaleData> = {
  [SupportedTranslationLocales.tr]: turkishUi,
  [SupportedTranslationLocales.en]: englishUi,
} as const;
