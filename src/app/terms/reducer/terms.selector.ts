import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SupportedTranslationLocales } from 'src/app/shared/i18n';
import { selectAll, State, termsFeatureKey } from ".";
import { Term } from "../term";

type CompareResult = -1 | 0 | 1;
const firstLetterRegexp = /[\p{L}\p{Nd}]/u;

function compareNormalized(a: string | undefined, b: string | undefined, locale = 'en'): CompareResult {
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

function compareByLanguage(lang: SupportedTranslationLocales): ((a: Term, b: Term) => number) {
  return function (a: Term, b: Term): number {
    const t1 = a.translations[lang];
    const t2 = b.translations[lang];
    return compareNormalized(t1, t2, lang);
  }
}

const termsFeatureSelector = createFeatureSelector<State>(termsFeatureKey);
export const selectAllTerms = createSelector(termsFeatureSelector, selectAll);

const extractInitial = (source: SupportedTranslationLocales, _target: SupportedTranslationLocales) => (term: Term, idx: number, arr: Term[]) => {
  let initial = '';
  // console.log(term.translations);
  const currInitial = term.translations[source].match(firstLetterRegexp)?.at(0);
  if (idx == 0 || compareNormalized(currInitial, arr[idx - 1].translations[source].match(firstLetterRegexp)?.at(0)) != 0) {
    initial = currInitial || '';
  }
  return { ...term, initial };
};

export const selectAndSortWithSearchTerm = (searchTerm: string, source: SupportedTranslationLocales, target: SupportedTranslationLocales) => {
  return createSelector(selectAllTerms, (terms) => {
    const sourceSearchTerm: string = searchTerm.toLocaleLowerCase(source);
    const targetSearchTerm: string = searchTerm.toLocaleLowerCase(target);
    //console.log(`search term: ${}`, source, target);
    const sourceRegex = new RegExp(sourceSearchTerm, 'gi');
    const targetRegex = new RegExp(targetSearchTerm, 'gi');
    if (searchTerm) {
      return terms.filter(term => {
        return !!(term.translations[target]) && (term.translations[target].match(targetRegex) || term.translations[source].match(sourceRegex));
      }).sort(compareByLanguage(source))
        .map(extractInitial(source, target));
    }
    return terms
      .filter(term => !!term.translations[target] && !!term.translations[source])
      .sort(compareByLanguage(source))
      .map(extractInitial(source, target));
  });
}
