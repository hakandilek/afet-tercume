import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { State } from '../reducers';
import { HeaderService, HeaderState, HeaderTemplate } from '../services/header.service';
import { LanguageInfoView, LanguageService } from '../services/language.service';
import { loadTerms } from './reducer/terms.actions';
import { selectAndSortWithSearchTerm } from './reducer/terms.selector';
import { Term } from './term';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.sass']
})

export class TermListComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild("search") searchInputField!: ElementRef<HTMLInputElement>

  searchTerm = ''
  terms$: Observable<Term[]>;
  public selectedSource$: Observable<LanguageInfoView>;
  public selectedTarget$: Observable<LanguageInfoView>;
  private destroy$ = new Subject<void>();
  constructor(
    private store: Store<State>,
    private headerService: HeaderService,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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

  onFocus(){
    if ('virtualKeyboard' in navigator) {
      console.log('virtual keyboard is supported');
      let newVariable: any;
      newVariable = window.navigator;
      newVariable.virtualKeyboard.show(),
      newVariable.virtualKeyboard.overlaysContent = false;
    } else {
      console.error('virtual keyboard is not supported');
    }
  }

  onBlur(){
      let newVariable: any;
      newVariable = window.navigator;
      newVariable.virtualKeyboard.hide(),
      newVariable.virtualKeyboard.overlaysContent = false;
  }

  select(): Observable<Term[]> {
    const currentLanguageSelection = this.languageService.getCurrentLanguageSelectionView();
    return this.terms$ = this.store.select(selectAndSortWithSearchTerm(this.searchTerm, currentLanguageSelection.sourceLanguage.isoCode, currentLanguageSelection.targetLanguage.isoCode));
  }

}

