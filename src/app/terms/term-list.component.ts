import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { State } from '../reducers';
import { loadTerms } from './reducer/terms.actions';
import { selectWithSearchTerm } from './reducer/terms.selector';
import { Term } from './term';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.sass']
})
export class TermListComponent implements OnInit {

  public firstLetterRegexp = /[\p{L}\p{Nd}]/u;

  searchTerm = ''
  terms$: Observable<Term[]>;

  constructor(
    private store: Store<State>,
  ) {
    this.terms$ = this.select();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTerms());
  }

  onSearch() {
    this.terms$ = this.select();
  }

  select(): Observable<Term[]> {
    return this.terms$ = this.store.select(selectWithSearchTerm(this.searchTerm))
      .pipe(map((terms) => {
        const sortedTerms = terms.slice().sort((a, b) => {
          const t1 = a.translations.get('Türkçe');
          const t2 = b.translations.get('Türkçe');
          return this.compareNormalized(t1, t2, 'tr');
        });
        console.log('sorting finished');
        return sortedTerms;
      }));
  }

  public compareNormalized(a: any, b: any, locale: string): CompareResult {
    if (typeof a === 'undefined') {
      return 1;
    }
    if (b === undefined || b === null) {
      return -1;
    }
    return a.localeCompare(b, locale, {
      ignorePunctuation: true,
      sensitivity: 'accent',
      numeric: true,
    }) as CompareResult;
  }
}

type CompareResult = -1 | 0 | 1;
