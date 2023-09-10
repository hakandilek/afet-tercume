import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TermsService } from './terms.service';
import { Provider } from '@angular/core';
import { OfflineService } from '../services/offline.service';
import { MockOfflineService } from '../services/mock-offline.service';

describe('TermsService', () => {
  let service: TermsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: OfflineService,
          useClass: MockOfflineService
        } as Provider
      ]
    });
    service = TestBed.inject(TermsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
