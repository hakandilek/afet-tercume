import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
    this.terms$ = this.store.select(selectAllTerms)
  }

  ngOnInit(): void {
    this.store.dispatch(loadTerms());
  }
}
