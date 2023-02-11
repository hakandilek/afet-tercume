import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { selectAll, State, termsFeatureKey } from ".";

const termsFeatureSelector = createFeatureSelector<State>(termsFeatureKey);
export const selectAllTerms = createSelector(termsFeatureSelector, selectAll);

export const selectWithSearchTerm = (searchTerm: String) =>
  createSelector(selectAllTerms, (terms) => {
    console.log(`search term: ${searchTerm}`);
    return terms;
  });
