import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, State, termsFeatureKey } from ".";

const termsFeatureSelector = createFeatureSelector<State>(termsFeatureKey);
export const selectAllTerms = createSelector(termsFeatureSelector, selectAll);

export const selectWithSearchTerm = (searchTerm: string) =>
  createSelector(selectAllTerms, (terms) => {
    console.log(`search term: ${searchTerm}`);
    const re = new RegExp(searchTerm, 'gi');
    if (!!searchTerm) {
      return terms.filter(term => {
        return !!(term.english) && term.english.match(re);
      });
    }
    return terms;
  });
