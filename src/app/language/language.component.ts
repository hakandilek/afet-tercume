import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SupportedLanguages } from '../constants/languages';
import { HeaderService, HeaderTemplate } from '../services/header.service';
import { LanguageInfoView, LanguageService } from '../services/language.service';

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

  constructor(
    private languageService: LanguageService,
    private headerService: HeaderService
  ) {
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
  public selectSource(sourceLanguage: SupportedLanguages): void {
    this.languageService.setLanguageSelection({sourceLanguage, uiLanguage: sourceLanguage})
  }
  public selectTarget(targetLanguage: SupportedLanguages): void {
    this.languageService.setLanguageSelection({targetLanguage})
  }

  public save(): void {
    this.languageService.saveLanguageSelection();
  }
}
