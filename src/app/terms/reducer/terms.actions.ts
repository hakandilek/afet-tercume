import { createAction, props } from '@ngrx/store';
import { SupportedTranslationLocales } from 'src/app/shared/i18n';
import { Term } from '../term';

export const loadTerms = createAction('[Terms/API] LoadTerms');
export const termsLoaded = createAction('[Terms/API] Terms Successfully Loaded',
props<{ terms: Term[] }>());
export const logNoResultSearch = createAction('[Terms/API] Log Search Result',
props<{
  keyword: string;
  sourceLocale: SupportedTranslationLocales;
  targetLocale: SupportedTranslationLocales;
}>());
export const searchResultLogged = createAction('[Terms/API] Search Result Logged');

  export const termsActionTypes = {
    loadTerms,
    termsLoaded,
    logNoResultSearch,
    searchResultLogged
  };
