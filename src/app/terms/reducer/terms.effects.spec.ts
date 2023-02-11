import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TermsEffects } from './terms.effects';

describe('TermsEffects', () => {
  let actions$: Observable<any>;
  let effects: TermsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TermsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TermsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
