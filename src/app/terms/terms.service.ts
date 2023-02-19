import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Term, TermsResponse } from './term';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';
import { SupportedTranslationLocales } from '../shared/i18n';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<Term[]> {
    return this.http.get<TermsResponse>(environment.termsUrl)
      .pipe(
        mergeMap(response => response.values),
        map((values) => {
          const translations: Record<SupportedTranslationLocales, string> = {
            [SupportedTranslationLocales.tr]: values[3],
            [SupportedTranslationLocales.en]: values[1],
            [SupportedTranslationLocales.es]: values[4],
            [SupportedTranslationLocales.de]: values[5],
            [SupportedTranslationLocales.ru]: values[6],
            [SupportedTranslationLocales.fr]: values[7],
            [SupportedTranslationLocales.ku]: values[8],
            [SupportedTranslationLocales.zza]: values[9],
            [SupportedTranslationLocales.ar]: values[10],
            [SupportedTranslationLocales.el]: values[11],
            [SupportedTranslationLocales.ja]: values[12],
            [SupportedTranslationLocales.he]: values[13],
            [SupportedTranslationLocales.it]: values[14]
          };
          // TODO add missing languages
          // translations.set("հայերեն", values[15]);
          // translations.set("Nederlands", values[16]);
          // translations.set(" 中文", values[17]);
          // translations.set("български", values[18]);
          // translations.set("한국인", values[19]);
          // translations.set("فارسی", values[20]);
          const term: Term = {
            id: values[0],
            english: values[1],
            domain: values[2],
            translations,
            initial: '',
          };
          return term;
        }),
        filter(term => !!(term.english && term.id != "Nr.")),
        toArray(),
      );
  }

}
