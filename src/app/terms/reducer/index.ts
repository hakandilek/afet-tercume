import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer, on} from '@ngrx/store';
import { Term } from '../term';
import { termsActionTypes } from './terms.actions';

export const termsFeatureKey = 'terms';

export interface State extends EntityState<Term> {

}

export const adapter: EntityAdapter<Term> = createEntityAdapter<Term>();

export const initialState: State = adapter.getInitialState({
});

export const reducer = createReducer(
  initialState,
  on(termsActionTypes.termsLoaded,
    (state, action) => adapter.setAll(action.terms, state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
