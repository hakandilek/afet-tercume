import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './language/language.component';
import { TermListComponent } from './terms/term-list.component';

const routes: Routes = [
  { path: 'terms', component: TermListComponent },
  { path: 'pick', component: LanguageComponent },
  { path: '', redirectTo: '/terms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
