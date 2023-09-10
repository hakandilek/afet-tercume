import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, firstValueFrom, interval, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SwCheckForUpdates, SwConfig, SwMessage } from '../messages';
import { dbVersion } from '../shared/storage/db';

@Injectable({providedIn: 'root'})
export class OfflineService {
  private serviceWorker$: ReplaySubject<ServiceWorker> = new ReplaySubject<ServiceWorker>(1);
  private appIsStable$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(appRef: ApplicationRef, private swUpdate: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    // every time a service-worker re-registered it will also trigger a 'sync' event
    appRef.isStable.pipe(
      first(isStable => isStable === true)
      ).subscribe(this.appIsStable$);
    const everyDay = interval(24 * 60 * 60 * 1000);
    const everyDayOnceAppIsStable$ = concat(this.appIsStable$, everyDay);

    // Get service worker to subject.
    // Sent env. vars to service worker
    this.appIsStable$.subscribe(async () => {
      await this.setServiceWorker();
      await this.dispatchMessage(new SwConfig(
        environment.searchLogApi,
        dbVersion
      ));
    });

    everyDayOnceAppIsStable$.subscribe(async () => {
      await this.checkForAppUpdate();
      await this.checkForDataUpdates();
    });
  }

  public serviceWorkerSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  private async checkForAppUpdate(): Promise<void> {
    // if update found refresh the page to get changes
    // if server is unreachable it won't refresh the page
    const updateFound = await this.swUpdate.checkForUpdate();
      if (updateFound) {
        this.reloadPage();
        return;
      }
  }

  private reloadPage(): void {
    document.location.reload();
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
    const serviceWorker = await firstValueFrom(this.serviceWorker$);
    serviceWorker.postMessage(message);
  }
}
