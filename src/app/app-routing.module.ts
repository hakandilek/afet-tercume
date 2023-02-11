import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermListComponent } from './term-list/term-list.component';

const routes: Routes = [
  { path: 'terms', component: TermListComponent },
  { path: '', redirectTo: '/terms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
