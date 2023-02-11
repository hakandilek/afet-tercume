import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TermListComponent } from './term-list/term-list.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TermsModule } from './terms/terms.module';
import { EffectsModule } from '@ngrx/effects';
import { TermsEffects } from './terms/reducer/terms.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TermListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    NoopAnimationsModule,
    SharedModule,
    EffectsModule.forRoot([
      TermsEffects,
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    TermsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
