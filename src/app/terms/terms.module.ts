import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTerms from './reducer';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TermsEffects } from './reducer/terms.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromTerms.termsFeatureKey, fromTerms.reducer),
    EffectsModule.forFeature([TermsEffects])
  ]
})
export class TermsModule { }
