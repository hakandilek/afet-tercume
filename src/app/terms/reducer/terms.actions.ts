import { createAction, props } from '@ngrx/store';
import { Term } from '../term';

export const loadTerms = createAction('[Terms/API] LoadTerms');
export const termsLoaded = createAction('[Terms/API] Terms Successfully Loaded',
  props<{ terms: Term[] }>());

  export const termsActionTypes = {
    loadTerms,
    termsLoaded,
  };
