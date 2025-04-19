import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { MockOfflineService } from 'src/app/services/mock-offline.service';
import { OfflineService } from 'src/app/services/offline.service';

import { TermsEffects } from './terms.effects';

describe('TermsEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>;
  let effects: TermsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: OfflineService,
          useValue: MockOfflineService
        } as Provider,
        TermsEffects,
        provideMockActions(() => actions$),

      ]
    });

    effects = TestBed.inject(TermsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
