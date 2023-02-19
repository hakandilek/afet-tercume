import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SupportedTranslationLocales } from "../shared/i18n/supported-translation-locales";
import { HeaderService, HeaderTemplate } from '../header/header.service';
import { LanguageInfoView, LanguageService } from './language.service';
import { LocaleService, UiLocale } from '../shared/i18n';

@Component({
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageComponent implements OnInit {
  public sourceLanguageList$: Observable<LanguageInfoView[]>;
  public targetLanguageList$: Observable<LanguageInfoView[]>;
  public selectedSource$: Observable<LanguageInfoView>;
  public selectedTarget$: Observable<LanguageInfoView>;
  public locale: UiLocale;

  constructor(
    private languageService: LanguageService,
    private headerService: HeaderService,
    private localeService: LocaleService
  ) {
    this.locale = this.localeService.currentUiLocale()
    this.sourceLanguageList$ = this.languageService.getLanguageSelectionList();
    this.targetLanguageList$ = this.languageService.getLanguageSelectionList();
    this.selectedSource$ = this.languageService.getLanguageSelectionView().pipe(map(selection => {
      return selection.sourceLanguage;
    }));
    this.selectedTarget$ = this.languageService.getLanguageSelectionView().pipe(map(selection => {
      return selection.targetLanguage;
    }));
  }
  ngOnInit(): void {
    this.headerService.setHeaderState({
      template: HeaderTemplate.languageSelection,
      data: ''
    });
  }
  public selectSource(sourceLanguage: SupportedTranslationLocales): void {
    this.languageService.setLanguageSelection({sourceLanguage})
  }
  public selectTarget(targetLanguage: SupportedTranslationLocales): void {
    this.languageService.setLanguageSelection({targetLanguage})
  }

  public save(): void {
    this.languageService.saveLanguageSelection();
  }
}
