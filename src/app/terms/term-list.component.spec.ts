import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import type { LanguageInfoView } from '../language';
import type { State } from '../reducers';
import { languageData, SupportedTranslationLocales } from '../shared/i18n';
import { SharedModule } from '../shared/shared.module';
import { HighlightPipe } from './highlight.pipe';
import { reducer } from './reducer';
import { TermListComponent } from './term-list.component';


const createDummyState = () => {
  const dummyTanslation = Object.keys(languageData).reduce((obj, key) => {
    obj[key as SupportedTranslationLocales] = key + '_text';
    return obj;
  }, {} as Record<SupportedTranslationLocales, string>);
  const entityState: State = {'terms': {
    ids: ['id1'],
    entities: {
      'id1': {
        id: 'id1',
        english: 'english_text',
        domain: 'domain',
        translations: {...dummyTanslation},
        initial: 'E'
      }
    }
  }};
  return entityState;
};

const createDummyLanguageView = (local: SupportedTranslationLocales) => {
  const localeDetail = languageData[SupportedTranslationLocales.en];
  return {
    isoCode: local,
    originName: localeDetail.otherLanguageNames[local],
    translatedName: localeDetail.otherLanguageNames[local]
  } as LanguageInfoView;
}

describe('TermListComponent', () => {
  let component: TermListComponent;
  let fixture: ComponentFixture<TermListComponent>;
  let testBed: TestBed;
  let store: MockStore;
  const initialState = { loggedIn: false, terms: {ids:[], entities: {}} };

  beforeEach(async () => {
    testBed = await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot(reducer)
      ],
      declarations: [ TermListComponent, HighlightPipe ],
      providers: [
        provideMockStore({ initialState }),
      ]
    });
    store = testBed.inject(MockStore<State>);
    testBed.compileComponents();
    fixture = testBed.createComponent(TermListComponent);
    component = fixture.componentInstance;
  });
  afterEach(async () => {
    TestBed.resetTestingModule()
  });

  it('should create', () => {
    testBed.compileComponents();

    fixture = TestBed.createComponent(TermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show loader until data arrives', async () => {
    fixture.detectChanges();
    const found = fixture.debugElement.queryAll(By.css('[data-test=loader-title]'))
    expect(found.length).toBe(1);
  });
  it('should hide loader after data retrieved', async () => {
    const entityState = createDummyState();
    fixture.detectChanges();
    const found = fixture.debugElement.queryAll(By.css('[data-test=loader-title]'))
    expect(found.length).toBe(1);
    store.setState(entityState);
    fixture.detectChanges();
    const found2 = fixture.debugElement.queryAll(By.css('[data-test=loader-title]'))
    expect(found2.length).toBe(0);
  });
  it('should show no result view, if no response returned from selection', async () => {
    component.loading = false;
    const emptyEntityState: State = {
      'terms': {
        ids: [],
        entities: {}
    }};
    component.searchTerm = '1234AAA';
    component.onSearch();
    store.setState(emptyEntityState);
    fixture.detectChanges();
    const found = fixture.debugElement.queryAll(By.css('[data-test=no-result]'))
    expect(found.length).toBe(1);
  });
});
