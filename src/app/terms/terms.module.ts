import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTerms from './reducer';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TermsEffects } from './reducer/terms.effects';
import { HighlightPipe } from './highlight.pipe';



@NgModule({
  declarations: [
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromTerms.termsFeatureKey, fromTerms.reducer),
    EffectsModule.forFeature([TermsEffects])
  ],
  exports: [
    HighlightPipe,
  ]
})
export class TermsModule { }
