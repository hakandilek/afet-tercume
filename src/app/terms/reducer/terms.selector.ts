import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, State, termsFeatureKey } from ".";

const termsFeatureSelector = createFeatureSelector<State>(termsFeatureKey);
export const selectAllTerms = createSelector(termsFeatureSelector, selectAll);
