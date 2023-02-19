import { Injectable } from '@angular/core';
import { uiLanguageData, UiLocale, UiLocaleData } from 'src/app/shared/i18n';
import { SupportedUiLocales } from "./supported-ui-locales";

@Injectable({providedIn:'root'})
export class LocaleService {
  private uiCode: SupportedUiLocales;
  private uiLocale: UiLocale;
  constructor() {
    const storageUiKey = localStorage.getItem('ui-language') as SupportedUiLocales;
    const browserLanguageIso = new Intl.Locale(window.navigator.language).language.split('-')[0];
    const storageUi = Object.values(SupportedUiLocales).find(key => storageUiKey === key);
    const browserUi = Object.values(SupportedUiLocales).find(key => browserLanguageIso === key);
    this.uiCode = storageUi || browserUi || SupportedUiLocales.en;
    this.uiLocale = this.getAnyUiLocale(this.uiCode);
  }

  public setUiLocale(language: SupportedUiLocales): void {
    this.uiCode = language;
    this.uiLocale = this.getAnyUiLocale(language);
    localStorage.setItem('ui-language', language);
  }

  public getCurrentUiLocaleCode(): SupportedUiLocales {
    return this.uiCode;
  }

  public getAnyUiLocale(code: SupportedUiLocales): UiLocaleData {
    const fallback = SupportedUiLocales.en;
    return uiLanguageData[code] || uiLanguageData[fallback];
  }

  public currentUiLocale(): UiLocale {
    if (this.uiCode !== SupportedUiLocales.en) {
      return {...this.uiLocale, alt: this.getAnyUiLocale(SupportedUiLocales.en)};
    } else {
      return {...this.uiLocale};
    }
  }
}
