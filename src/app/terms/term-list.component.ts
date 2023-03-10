import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { State } from '../reducers';
import { loadTerms } from './reducer/terms.actions';
import { selectAndSortWithSearchTerm } from './reducer/terms.selector';
import { Term } from './term';
import { LocaleService, UiLocale } from '../shared/i18n';
import { LanguageInfoView, LanguageService } from '../language';
import { HeaderTemplate, HeaderState, HeaderService } from '../header';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.sass']
})

export class TermListComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {

  @ViewChild("search") searchInputField!: ElementRef<HTMLInputElement>

  searchTerm = ''
  terms$: Observable<Term[]>;
  public selectedSource$: Observable<LanguageInfoView>;
  public selectedTarget$: Observable<LanguageInfoView>;
  public locale: UiLocale;
  private destroy$ = new Subject<void>();
  constructor(
    private store: Store<State>,
    private headerService: HeaderService,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef,
    private localeService: LocaleService
  ) {
    this.locale = this.localeService.currentUiLocale();
    this.terms$ = this.select();
    this.selectedSource$ = this.languageService.getLanguageSelectionView().pipe(
      takeUntil(this.destroy$),
      map(selection => {
        return selection.sourceLanguage;
    }));
    this.selectedTarget$ = this.languageService.getLanguageSelectionView().pipe(
      takeUntil(this.destroy$),
      map(selection => {
        return selection.targetLanguage;
    }));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTerms());
    if ('virtualKeyboard' in navigator) {
      const newVariable: any = window.navigator;
      newVariable.virtualKeyboard.show(),
      newVariable.virtualKeyboard.overlaysContent = true;
    } else {
      // alert('virtual keyboard is not supported');
    }

    this.languageService.getLanguageSelectionView()
    .pipe(
      takeUntil(this.destroy$),
      map(languageSelection => {
      // TODO lang file label here
      return {
        template: HeaderTemplate.search,
        data: `${languageSelection.sourceLanguage.originName} > ${languageSelection.targetLanguage.originName}`
      } as HeaderState;
    }))
    .subscribe((a) => {
      this.headerService.setHeaderState(a);
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.searchInputField?.nativeElement?.focus();
  }

  onSearch() {
    this.terms$ = this.select();
  }

  select(): Observable<Term[]> {
    const currentLanguageSelection = this.languageService.getCurrentLanguageSelectionView();
    return this.terms$ = this.store.select(selectAndSortWithSearchTerm(this.searchTerm, currentLanguageSelection.sourceLanguage.isoCode, currentLanguageSelection.targetLanguage.isoCode));
  }

}

