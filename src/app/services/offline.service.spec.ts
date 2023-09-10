import { ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, of } from 'rxjs';

import { OfflineService } from '../services/offline.service';

describe('OfflineService', async () => {
  let service: OfflineService;
  let swUpdate: SwUpdate;
  let applicationRef: ApplicationRef;

  beforeEach(async () => {
    swUpdate = {
      checkForUpdate: async () => false
    } as SwUpdate;
    applicationRef = {
      isStable: of(true)
    } as ApplicationRef;
    service = new OfflineService(applicationRef, swUpdate);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('given there is an update', () => {
    it('should trigger a page reload', async () => {
      const stableSubject = new BehaviorSubject<boolean>(false);
      const appRef: ApplicationRef = {
        isStable: stableSubject.asObservable()
      } as ApplicationRef;
      const swUpdate: SwUpdate = {checkForUpdate: async () => true} as SwUpdate;
      service = new OfflineService(appRef, swUpdate);
      const reloadPromise = new Promise(resolve => {
        const mockReload = () => {
          resolve(true);
        }
        service['reloadPage'] = mockReload;
        stableSubject.next(true);
      });
      expect(await reloadPromise).toBeTrue();
    });

  });

  describe('serviceWorkerSupported method', () => {
    it('should return if service worker is supported by browser', () => {
      expect(service.serviceWorkerSupported()).toBeTrue();
    });
  });
});
