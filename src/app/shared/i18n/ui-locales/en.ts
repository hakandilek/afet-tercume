import { UiLocaleData } from '../ui-locale';
import { SupportedUiLocales } from "../supported-ui-locales";

export const englishUi: UiLocaleData = {
  isoCode: SupportedUiLocales.en,
  labels: {
    languagePage: {
      saveButton: 'Save',
    },
    headerSection: {
      languagePageLink: 'Change',
      languagePageTitle: 'Choose language',
      settingPageTitle: 'Settings'
    },
    settingsPage: {
      changeUiLanguageLink: 'Change language',
      contactLink: 'Report problem / Contact',
      sponsorLink: 'Sponsor links',
      updateLink: 'Update terminology'
    },
    termsPage: {
      dataLoadingMessage: 'Data loading',
      dataLoadingMessageDetail: 'Please wait until the term list is loaded.',
      noResultMessage: 'No result',
      searchPlaceholder: 'Search keyword'
    }
  }
}
