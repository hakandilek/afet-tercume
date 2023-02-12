import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, State, termsFeatureKey } from ".";
import { Term } from "../term";

type CompareResult = -1 | 0 | 1;
const firstLetterRegexp = /[\p{L}\p{Nd}]/u;

function compareNormalized(a: any, b: any, locale: string = 'en'): CompareResult {
  if (typeof a === 'undefined') {
    return 1;
  }
  if (b === undefined || b === null) {
    return -1;
  }
  return a.localeCompare(b, locale, {
    ignorePunctuation: true,
    sensitivity: 'accent',
    numeric: true,
  }) as CompareResult;
}

function compareByLanguage(lang: string): ((a: Term, b: Term) => number) {
  return function (a: Term, b: Term): number {
    const t1 = a.translations.get(lang);
    const t2 = b.translations.get(lang);
    return compareNormalized(t1, t2, 'tr');
  }
}

const termsFeatureSelector = createFeatureSelector<State>(termsFeatureKey);
export const selectAllTerms = createSelector(termsFeatureSelector, selectAll);

const extractInitial = (term: Term, idx: number, arr: Term[]) => {
  var initial = '';
  const currInitial = term.translations.get('Türkçe')?.match(firstLetterRegexp)?.at(0);
  if (idx == 0 || compareNormalized(currInitial, arr[idx - 1].translations.get('Türkçe')?.match(firstLetterRegexp)?.at(0)) != 0) {
    initial = currInitial!;
  }
  return { ...term, initial };
};

export const selectAndSortWithSearchTerm = (searchTerm: string) =>
  createSelector(selectAllTerms, (terms) => {
    console.log(`search term: ${searchTerm}`);
    const re = new RegExp(searchTerm, 'gi');
    if (!!searchTerm) {
      return terms.filter(term => {
        return !!(term.english) && (term.english.match(re) || term.translations.get('Türkçe')?.match(re));
      }).sort(compareByLanguage('Türkçe'))
        .map(extractInitial);
    }
    return terms.sort(compareByLanguage("Türkçe"))
      .map(extractInitial);
  });
