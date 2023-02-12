import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Term, TermsResponse } from './term';
import { concatMap, filter, map, mergeMap, skip, switchMap, toArray } from 'rxjs/operators';

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
          const translations = new Map<string, string>();
          translations.set("Türkçe", values[3]);
          translations.set("Español", values[4]);
          translations.set("Deutsch", values[5]);
          translations.set("Русский", values[6]);
          translations.set("Français", values[7]);
          translations.set("Kürtçe", values[8]);
          translations.set("Zazaca", values[9]);
          translations.set("عربي", values[10]);
          translations.set("Ελληνικα ", values[11]);
          translations.set("日本語", values[12]);
          translations.set("עִברִית", values[13]);
          translations.set("Italiano", values[14]);
          translations.set("հայերեն", values[15]);
          translations.set("Nederlands", values[16]);
          translations.set(" 中文", values[17]);
          translations.set("български", values[18]);
          translations.set("한국인", values[19]);
          translations.set("فارسی", values[20]);
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
