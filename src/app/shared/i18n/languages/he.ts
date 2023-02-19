import { LanguageDetails } from '../language-details';
import { SupportedTranslationLocales } from '../supported-translation-locales';

export const hebrew: LanguageDetails = {
  isoCode: SupportedTranslationLocales.he,
  rtl: true,
  dataField: 'עִברִית',
  otherLanguageNames: {
    ar: 'ערבית',
    de: 'גרמנית',
    el: 'יוונית',
    en: 'אנגלית',
    es: 'ספרדית',
    fr: 'צרפתית',
    he: 'עברית',
    it: 'איטלקית',
    ja: 'יפנית',
    ku: 'כורדית',
    ru: 'רוסית',
    tr: 'טורקית',
    zza: 'זאזא',
  }
}
