import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ColumnComponent
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ColumnComponent]
})
export class BoardModule { }
