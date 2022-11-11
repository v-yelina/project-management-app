import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';

@NgModule({
  declarations: [ConfirmPopupComponent, InfoPopupComponent],
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule],
  exports: [
    ConfirmPopupComponent,
    InfoPopupComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
