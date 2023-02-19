import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SupportedTranslationLocales } from "../shared/i18n/supported-translation-locales";
import { languageData } from "../shared/i18n";
import { LanguageState } from './language-state';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSelection$: BehaviorSubject<LanguageState>;

  constructor(
    private location: Location,
    private router: Router
  ) {
    const parsedState = this.parseUrl();
    const browserLanguageIso = new Intl.Locale(window.navigator.language).language.split('-')[0];
    let initialSourceLanguage = (parsedState.src || browserLanguageIso) as SupportedTranslationLocales;
    if (!initialSourceLanguage || !SupportedTranslationLocales[initialSourceLanguage]) {
      initialSourceLanguage = languageData.tr.isoCode;
    }
    let initialTargetLanguage = (parsedState.trgt || languageData.en.isoCode) as SupportedTranslationLocales;
    if (!SupportedTranslationLocales[initialTargetLanguage]) {
      initialTargetLanguage = languageData.en.isoCode;
    }
    if (initialSourceLanguage === initialTargetLanguage
      && initialSourceLanguage !== languageData.en.isoCode) {
      initialTargetLanguage = languageData.en.isoCode;
    } else if (initialSourceLanguage === initialTargetLanguage) {
      initialTargetLanguage = languageData.tr.isoCode;
    }

    this.languageSelection$ = new BehaviorSubject({
      sourceLanguage: initialSourceLanguage,
      targetLanguage: initialTargetLanguage
    });
  }
  public getLanguageSelection(): Observable<LanguageState> {
    return this.languageSelection$;
  }

  public getCurrentLanguageSelectionView(): LanguageSelectionInfoView {
    const languageSelection = this.languageSelection$.value;
    return {
      sourceLanguage: this.getLanguageInfoView(languageSelection.sourceLanguage, languageSelection.targetLanguage),
      targetLanguage: this.getLanguageInfoView(languageSelection.targetLanguage, languageSelection.sourceLanguage)
    } as LanguageSelectionInfoView;
  }

  public getLanguageSelectionView(): Observable<LanguageSelectionInfoView> {
    return this.languageSelection$.pipe(
      map(languageSelection => {
      return {
        sourceLanguage: this.getLanguageInfoView(languageSelection.sourceLanguage, languageSelection.sourceLanguage),
        targetLanguage: this.getLanguageInfoView(languageSelection.targetLanguage, languageSelection.sourceLanguage)
    } as LanguageSelectionInfoView;
  }));
  }

  public setLanguageSelection(languageSelection: Partial<LanguageState>): void {
    this.languageSelection$.next({...this.languageSelection$.value, ...languageSelection});
  }

  public getLanguageSelectionList(): Observable<LanguageInfoView[]> {
    return this.getLanguageSelection().pipe(map(currentSelection => {
      const result = Object.values(SupportedTranslationLocales).map(isoKey => {
        const translateTargetIsoKey = currentSelection.sourceLanguage;
        const rtl = languageData[isoKey].rtl;
        const originName = languageData[isoKey].otherLanguageNames[isoKey];
        const translatedName = languageData[translateTargetIsoKey].otherLanguageNames[isoKey];
        return {
          rtl,
          isoCode: isoKey,
          originName,
          translatedName
        } as LanguageInfoView;
      });
      return result;
    }));
  }

  public saveLanguageSelection(): void {
    this.replaceUrl({
      src: this.languageSelection$.value.sourceLanguage,
      trgt: this.languageSelection$.value.targetLanguage
    });
    this.router.navigate(['/terms']);
  }

  private getLanguageInfoView(language: SupportedTranslationLocales, altLanguage: SupportedTranslationLocales): LanguageInfoView {
    const isoCode = languageData[language].isoCode;
    const rtl = languageData[language].rtl;
    const originName = languageData[language].otherLanguageNames[language];
    const translatedName = languageData[altLanguage].otherLanguageNames[language];
    return {
      rtl,
      isoCode,
      originName,
      translatedName
    }
  }

  private replaceUrl(params: QueryParamState): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([this.router.url.split('?')[0]], {
        queryParams: params,
      })
    );
    this.location.replaceState(url);
  }
  private parseUrl(): QueryParamState {
    const url = this.router.parseUrl(this.router.url)
    const src = url.queryParams['src'];
    const trgt = url.queryParams['trgt'];
    return {src, trgt};
  }
}

export interface LanguageInfoView {
  originName: string;
  translatedName: string;
  isoCode: SupportedTranslationLocales;
  rtl?: boolean;
}

export interface LanguageSelectionInfoView {
  sourceLanguage: LanguageInfoView;
  targetLanguage: LanguageInfoView;
}

interface QueryParamState {
  src: string;
  trgt: string;
}
