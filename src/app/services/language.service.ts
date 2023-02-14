import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { languages, SupportedLanguages } from '../constants/languages';
import { LanguageState } from '../language/language-state';
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
    const browserLanguageIso = parsedState.ui || new Intl.Locale(window.navigator.language).language.split('-')[0];
    let initialSourceLanguage = (parsedState.src || browserLanguageIso) as SupportedLanguages;
    if (!initialSourceLanguage || !SupportedLanguages[initialSourceLanguage]) {
      initialSourceLanguage = languages.tr.isoCode;
    }
    let initialTargetLanguage = (parsedState.trgt || languages.en.isoCode) as SupportedLanguages;
    if (!SupportedLanguages[initialTargetLanguage]) {
      initialTargetLanguage = languages.en.isoCode;
    }
    if (initialSourceLanguage === initialTargetLanguage
      && initialSourceLanguage !== languages.en.isoCode) {
      initialTargetLanguage = languages.en.isoCode;
    } else if (initialSourceLanguage === initialTargetLanguage) {
      initialTargetLanguage = languages.tr.isoCode;
    }

    this.languageSelection$ = new BehaviorSubject({
      sourceLanguage: initialSourceLanguage,
      targetLanguage: initialTargetLanguage,
      uiLanguage: initialSourceLanguage
    });
  }
  public getLanguageSelection(): Observable<LanguageState> {
    return this.languageSelection$;
  }

  public getCurrentLanguageSelectionView(): LanguageSelectionInfoView {
    const languageSelection = this.languageSelection$.value;
    return {
      sourceLanguage: this.getLanguageInfoView(languageSelection.sourceLanguage, languageSelection.uiLanguage),
      targetLanguage: this.getLanguageInfoView(languageSelection.targetLanguage, languageSelection.uiLanguage),
      uiLanguage: this.getLanguageInfoView(languageSelection.uiLanguage, languageSelection.uiLanguage)
    } as LanguageSelectionInfoView;
  }

  public getLanguageSelectionView(): Observable<LanguageSelectionInfoView> {
    return this.languageSelection$.pipe(map(languageSelection => {
      return {
        sourceLanguage: this.getLanguageInfoView(languageSelection.sourceLanguage, languageSelection.uiLanguage),
        targetLanguage: this.getLanguageInfoView(languageSelection.targetLanguage, languageSelection.uiLanguage),
        uiLanguage: this.getLanguageInfoView(languageSelection.uiLanguage, languageSelection.uiLanguage)
    } as LanguageSelectionInfoView;
  }));
  }

  public setLanguageSelection(languageSelection: Partial<LanguageState>): void {
    this.languageSelection$.next({...this.languageSelection$.value, ...languageSelection});
  }

  public getLanguageSelectionList(): Observable<LanguageInfoView[]> {
    return this.getLanguageSelection().pipe(map(currentSelection => {
      const result = Object.values(SupportedLanguages).map(isoKey => {
        const translateTargetIsoKey = currentSelection.uiLanguage;
        const originName = languages[isoKey].otherLanguageNames[isoKey];
        const translatedName = languages[translateTargetIsoKey].otherLanguageNames[isoKey];
        return {
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
      trgt: this.languageSelection$.value.targetLanguage,
      ui: this.languageSelection$.value.uiLanguage
    });
    this.router.navigate(['/terms']);
  }

  private getLanguageInfoView(language: SupportedLanguages, uiLanguage: SupportedLanguages): LanguageInfoView {
    const isoCode = languages[language].isoCode;
    const originName = languages[language].otherLanguageNames[language];
    const translatedName = languages[uiLanguage].otherLanguageNames[language];
    return {
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
    const ui = url.queryParams['ui'];
    return {src, trgt, ui};
  }
}

export interface LanguageInfoView {
  originName: string;
  translatedName: string;
  isoCode: SupportedLanguages;
}

export interface LanguageSelectionInfoView {
  sourceLanguage: LanguageInfoView;
  targetLanguage: LanguageInfoView;
  uiLanguage: LanguageInfoView;
}

interface QueryParamState {
  src: string;
  trgt: string;
  ui: string;
}
