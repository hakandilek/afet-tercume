import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { TermsService } from '../terms.service';
import { loadTerms, logNoResultSearch, searchResultLogged, termsLoaded } from './terms.actions';



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

  logNoResultSearch$ = createEffect(() => this.actions$.pipe(
    ofType(logNoResultSearch),
    concatMap((data) => this.service.createSearchNoResultLog(data.keyword, data.sourceLocale, data.targetLocale)),
    map(() => searchResultLogged())
  ));

}
