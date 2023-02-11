import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, filter, map, mergeMap, skip, switchMap, toArray } from 'rxjs/operators';
import { Term } from '../term';
import { TermsService } from '../terms.service';
import { loadTerms, termsLoaded } from './terms.actions';



@Injectable()
export class TermsEffects {

  constructor(
    private actions$: Actions,
    private service: TermsService,
  ) { }

  loadTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTerms),
      concatMap(() => this.service.getAll()),
      //map(term => { console.log(`${JSON.stringify(term)}`); return term; }),
      map(terms => termsLoaded({ terms }))
    )
  );

}
