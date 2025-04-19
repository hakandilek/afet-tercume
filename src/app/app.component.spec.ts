import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MockOfflineService } from './services/mock-offline.service';
import { OfflineService } from './services/offline.service';
import { SharedModule } from './shared/shared.module';
import { reducer } from './terms/reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot(reducer),
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      providers: [
        {
          provide: OfflineService,
          useClass: MockOfflineService
        } as Provider
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Afet Terimleri'`, () => {

    const titleService = TestBed.inject(Title);
    const spy = spyOn(titleService, 'setTitle');
    TestBed.createComponent(AppComponent);
    expect(spy).toHaveBeenCalledWith('Afet Terimleri');
  });

});
