import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  createReducer} from '@ngrx/store';
import { Term } from '../term';

export const termsFeatureKey = 'terms';

export interface State {

}

export const adapter: EntityAdapter<Term> = createEntityAdapter<Term>();

export const initialState: State = adapter.getInitialState({
});

export const reducer = createReducer(
  initialState,
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
