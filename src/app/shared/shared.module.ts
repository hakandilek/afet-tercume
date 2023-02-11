import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule
  ],
  exports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
