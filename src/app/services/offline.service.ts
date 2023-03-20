import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, lastValueFrom, ReplaySubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { dbVersion } from '../shared/storage/db';

@Injectable({providedIn: 'root'})
export class OfflineService {
  private serviceWorker$: ReplaySubject<ServiceWorker> = new ReplaySubject<ServiceWorker>(1);
  private appIsStable$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    // every time a service-worker re-registered it will also trigger a 'sync' event
    this.appIsStable$.subscribe(stab => console.log('stab', stab));
    appRef.isStable.pipe(
      tap((stab) => {
        console.log('istable?:', stab);

      }),
      first(isStable => isStable === true)
      ).subscribe(this.appIsStable$);
    const everyDay = interval(24 * 60 * 60 * 1000);
    const everyDayOnceAppIsStable$ = concat(this.appIsStable$, everyDay);

    everyDayOnceAppIsStable$.subscribe(async () => {
      console.groupCollapsed('everySixHoursOnceAppIsStable', new Date().toISOString());
      try {
        const updateFound = await updates.checkForUpdate();

        await this.checkForDataUpdates();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');

      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
      console.groupEnd();
    });
  }

  public async initServiceWorker(): Promise<void> {
    console.log('initServiceWorker');
    this.appIsStable$.subscribe(stab => console.log('stab from initServiceWorker', stab));
    this.appIsStable$.subscribe((isStable) => {
      console.log('appIsStable$ dispatchInitServiceWorker', isStable);
      if (!isStable) {
        return;
      }
      this.setServiceWorker().then(() => {
        this.dispatchMessage(new SwConfig(
          environment.searchLogApi,
          dbVersion
        ));
      });
    });
  }

  private async setServiceWorker(): Promise<void> {
    if (navigator?.serviceWorker?.controller) {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        this.serviceWorker$.next(registration.active);
      }
    }
  }

  public async checkForDataUpdates(): Promise<void> {
    // TODO
    // if('serviceWorker' in navigator && 'SyncManager' in window) {
    //   const sw: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    //   const regs = await (sw as any).sync.register('sync-new-problem+' + new Date().toISOString());
    // }
    this.dispatchMessage(new SwCheckForUpdates());
  }

  public serviceWorkerSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  private async dispatchMessage(message: SwMessage): Promise<void> {
    const serviceWorker = await lastValueFrom(this.serviceWorker$);
    // const sw: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    // const controller = navigator.serviceWorker.controller;
    console.log('dispatchMessage: ', serviceWorker);
    serviceWorker.postMessage(message);
  }
}

interface SwMessage {
  type: string;
}

class SwConfig implements SwMessage {
  readonly type = 'SwConfig';
  constructor(
    public searchLogApi: string,
    public dbVersion: number
  ) {}
}

class SwCheckForUpdates implements SwMessage {
  readonly type = 'SwCheckForUpdates';
}
