import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Term, TermsResponse } from './term';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';
import { SupportedLanguages } from '../constants/languages';

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
          const translations: Record<SupportedLanguages, string> = {
            [SupportedLanguages.tr]: values[3],
            [SupportedLanguages.en]: values[1],
            [SupportedLanguages.es]: values[4],
            [SupportedLanguages.de]: values[5],
            [SupportedLanguages.ru]: values[6],
            [SupportedLanguages.fr]: values[7],
            [SupportedLanguages.ku]: values[8],
            [SupportedLanguages.zza]: values[9],
            [SupportedLanguages.ar]: values[10],
            [SupportedLanguages.el]: values[11],
            [SupportedLanguages.ja]: values[12],
            [SupportedLanguages.he]: values[13],
            [SupportedLanguages.it]: values[14]
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
