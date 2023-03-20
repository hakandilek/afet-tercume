import { Provider } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { LanguageSelectionInfoView, LanguageService } from '../language';

import type { State } from '../reducers';
import { MockOfflineService } from '../services/mock-offline.service';
import { OfflineService } from '../services/offline.service';
import { languageData, SupportedTranslationLocales } from '../shared/i18n';
import { SharedModule } from '../shared/shared.module';
import { HighlightPipe } from './highlight.pipe';
import { reducer } from './reducer';
import { TermListComponent } from './term-list.component';
import { TermsService } from './terms.service';


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

describe('TermListComponent', () => {
  let component: TermListComponent;
  let fixture: ComponentFixture<TermListComponent>;
  let testBed: TestBed;
  let store: MockStore;
  let termsService: TermsService;
  let languageService: LanguageService;
  const initialState = { loggedIn: false, terms: {ids:[], entities: {}} };

  beforeEach(async () => {
    testBed = await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot(reducer)
      ],
      declarations: [ TermListComponent, HighlightPipe ],
      providers: [
        {
          provide: OfflineService,
          useClass: MockOfflineService
        } as Provider,
        provideMockStore({ initialState }),
      ]
    });
    termsService = testBed.inject(TermsService);
    languageService = testBed.inject(LanguageService);
    languageService.getLanguageSelectionView = () => {
      return of({
          sourceLanguage: {
            originName: 'Türkçe',
            translatedName: 'Turkish',
            isoCode: SupportedTranslationLocales.tr
          },
          targetLanguage: {
            originName: 'English',
            translatedName: 'İngilizce',
            isoCode: SupportedTranslationLocales.en
          },
        } as LanguageSelectionInfoView);
      };
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
  it('should hide loader after data retrieved', fakeAsync(() => {
    termsService.createSearchNoResultLog = () => {
      return of(void(0));
    };
    const entityState = createDummyState();
    fixture.detectChanges();
    const found = fixture.debugElement.queryAll(By.css('[data-test=loader-title]'))
    expect(found.length).toBe(1);
    store.setState(entityState);
    tick(1000); // To wait for the debounce time
    fixture.detectChanges();
    const found2 = fixture.debugElement.queryAll(By.css('[data-test=loader-title]'))
    expect(found2.length).toBe(0);
  }));
  it('should show no result view, if no response returned from selection', async () => {
    termsService.createSearchNoResultLog = () => {
      return of(void(0));
    };

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
    await fixture.whenStable();
    fixture.detectChanges();
    const found = fixture.debugElement.queryAll(By.css('[data-test=no-result]'));
    expect(found.length).toBe(1);
  });
});
