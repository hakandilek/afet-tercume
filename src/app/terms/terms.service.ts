import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Term, TermsResponse } from './term';
import { filter, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { SupportedTranslationLocales } from '../shared/i18n';
import { AppDB } from '../shared/storage/db';
import { SearchLog } from '../shared/models/search-log.model';
import { OfflineService } from '../services/offline.service';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  constructor(
    private http: HttpClient,
    private db: AppDB,
    private offlineService: OfflineService
    ) {}

  getAll(): Observable<Term[]> {
    return this.http.get<TermsResponse>(environment.termsUrl)
      .pipe(
        tap((response) => {console.log('get TERMS Tap TAP', response)}),
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

  createSearchNoResultLog(keyword: string, originLocale: SupportedTranslationLocales, targetLocale: SupportedTranslationLocales): Observable<void> {
    if (!keyword) {
      return of(void 0);
    }
    // TODO change the url and the api call according to new sheet
    const searchLog: SearchLog = {
      created: new Date(),
      searchTerm: keyword,
      sourceLocale: originLocale,
      targetLocale: targetLocale,
      id: `${originLocale}:${keyword}`
    };
    console.log('Saving to DB: ', keyword);
    if (this.offlineService.serviceWorkerSupported()) {
      this.db.searchLog.put(searchLog, searchLog.id);
      return of(void 0);
    } else {
      // service worker not supported therefor making direct request
      return this.http.post<void>(environment.searchLogApi, {
        data: [{
          trm: keyword,
          src: originLocale,
          trg: targetLocale
        }],
        mode: 'RAW',
        sheet: 'rawdata'
      } as SheetDbWriteRequest<SearchNoResultLog>);
    }
  }
}
export interface SearchNoResultLog {
  trm: string;
  src: SupportedTranslationLocales;
  trg: SupportedTranslationLocales;
}

interface GoogleSheetsWriteRequest<T> {
  range: string;
  majorDimension: 'ROWS' | 'COLUMNS',
  values: T[]
}

interface SheetDbWriteRequest<T> {
  sheets?: string,
  mode?: 'RAW' | 'USER_ENTERED',
  data: T[]
}
