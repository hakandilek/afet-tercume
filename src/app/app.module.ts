import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { metaReducers, reducers } from './reducers';
import { SharedModule } from './shared/shared.module';
import { TermsEffects } from './terms/reducer/terms.effects';
import { TermListComponent } from './terms/term-list.component';
import { TermsModule } from './terms/terms.module';
import { LanguageComponent } from './language/language.component';
import { OfflineService } from './services/offline.service';

@NgModule({
  declarations: [
    AppComponent,
    TermListComponent,
    HeaderComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    EffectsModule.forRoot([
      TermsEffects,
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
    TermsModule,
    ServiceWorkerModule.register('service-worker-loader.js', {
      // By default service workers are disabled on dev mode
      // This setting should be set to true to do development on service-workers itself
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable'
    }),
  ],
  providers: [
    OfflineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
