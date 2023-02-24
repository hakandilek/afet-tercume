import { UiLocaleData } from '../ui-locale';
import { SupportedUiLocales } from "../supported-ui-locales";


export const turkishUi: UiLocaleData = {
  isoCode: SupportedUiLocales.tr,
  labels: {
    languagePage: {
      saveButton: 'Kaydet'
    },
    headerSection: {
      languagePageLink: 'Değiştir',
      languagePageTitle: 'Dil Seçimi',
      settingPageTitle: 'Ayarlar'
    },
    settingsPage: {
      changeUiLanguageLink: 'Dil değiştir',
      contactLink: 'Hata Bildir / İletişim',
      sponsorLink: 'Himaye linkleri',
      updateLink: 'En güncel sözlüğü indir'
    },
    termsPage: {
      dataLoadingMessage: 'Yükleniyor',
      dataLoadingMessageDetail: 'Terim listesi yükleninceye dek lüfen bekleyiniz.',
      noResultMessage: 'Sonuç bulunamadı',
      searchPlaceholder: 'Kelime arama'
    }
  }
}
