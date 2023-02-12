import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { loadTerms } from './reducer/terms.actions';
import { selectAndSortWithSearchTerm } from './reducer/terms.selector';
import { Term } from './term';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.sass']
})
export class TermListComponent implements OnInit {

  @ViewChild("search") searchInputField!: ElementRef<HTMLInputElement>

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

  ngAfterViewInit() {
    this.searchInputField?.nativeElement?.focus();
  }

  onSearch() {
    this.terms$ = this.select();
  }

  select(): Observable<Term[]> {
    return this.terms$ = this.store.select(selectAndSortWithSearchTerm(this.searchTerm));
  }

}

