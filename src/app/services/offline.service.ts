import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, lastValueFrom, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { dbVersion } from '../shared/storage/db';

@Injectable({providedIn: 'root'})
export class OfflineService {
  private serviceWorker$: ReplaySubject<ServiceWorker> = new ReplaySubject<ServiceWorker>(1);
  private appIsStable$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(appRef: ApplicationRef, swUpdate: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    // every time a service-worker re-registered it will also trigger a 'sync' event
    appRef.isStable.pipe(
      first(isStable => isStable === true)
      ).subscribe(this.appIsStable$);
    const everyDay = interval(24 * 60 * 60 * 1000);
    const everyDayOnceAppIsStable$ = concat(this.appIsStable$, everyDay);

    everyDayOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await swUpdate.checkForUpdate();

        await this.checkForDataUpdates();
        // console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');

      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  public async initServiceWorker(): Promise<void> {
    this.appIsStable$.subscribe((isStable) => {
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

  public serviceWorkerSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  private async setServiceWorker(): Promise<void> {
    if (navigator?.serviceWorker?.controller) {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        this.serviceWorker$.next(registration.active);
      }
    }
  }

  private async checkForDataUpdates(): Promise<void> {
    this.dispatchMessage(new SwCheckForUpdates());
  }

  private async dispatchMessage(message: SwMessage): Promise<void> {
    const serviceWorker = await lastValueFrom(this.serviceWorker$);
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
