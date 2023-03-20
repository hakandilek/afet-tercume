import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { SearchLog } from '../models/search-log.model';

export const dbVersion = 1;
@Injectable({providedIn: 'root'})
export class AppDB extends Dexie {
  searchLog!: Table<SearchLog, string>;

  constructor() {
    super('offline-db');
    this.version(dbVersion).stores({
      searchLog: '&id, searchTerm, sourceLocale, targetLocale, created, synced'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // populate if needed
  }
}
