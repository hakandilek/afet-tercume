import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { debug } from './debug';
import * as fromTerms from '../terms/reducer';

export interface State {
  [fromTerms.termsFeatureKey]: fromTerms.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTerms.termsFeatureKey]: fromTerms.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
