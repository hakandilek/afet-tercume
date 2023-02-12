import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { State } from '../reducers';
import { selectAll } from './reducer';
import { loadTerms } from './reducer/terms.actions';
import { selectAllTerms } from './reducer/terms.selector';
import { Term } from './term';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.sass']
})
export class TermListComponent implements OnInit {
  searchTerm = ''
  terms$: Observable<Term[]>;
  constructor(
    private store: Store<State>,
  ) {
    this.terms$ = this.store.select(selectAllTerms).pipe(map((terms) => {
      const sortedTerms = terms.slice().sort((a, b) => {
        const t1 = a.translations.get('Türkçe')?.toLocaleLowerCase();
        const t2 = b.translations.get('Türkçe')?.toLocaleLowerCase();
        return this.compareNormalized(t1, t2, 'tr');
      });
      return sortedTerms;
    }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTerms());
  }

  private compareNormalized(a: any, b: any, locale: string): CompareResult {
    if (typeof a === 'undefined') {
      return 1;
    }
    if (b === undefined || b === null) {
      return -1;
    }
    return a.localeCompare(b, locale, {
      ignorePunctuation: true,
      sensitivity: 'variant',
      numeric: true,
    }) as CompareResult;
  }
}

type CompareResult = -1 | 0 | 1;
