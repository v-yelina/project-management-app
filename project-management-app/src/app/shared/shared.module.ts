import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';

@NgModule({
  declarations: [ConfirmPopupComponent],
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule],
  exports: [ConfirmPopupComponent],
})
export class SharedModule {}