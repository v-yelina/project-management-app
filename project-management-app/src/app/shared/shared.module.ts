import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { L10nIntlModule, L10nTranslationModule } from 'angular-l10n';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';

import { CreateBoardPopupComponent } from './components/create-board-popup/create-board-popup.component';
import { NotificationSnackBarComponent } from './components/notification-snack-bar/notification-snack-bar.component';

@NgModule({
  declarations: [ConfirmPopupComponent, CreateBoardPopupComponent, NotificationSnackBarComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    NgxSmoothDnDModule,
    L10nTranslationModule,
    L10nIntlModule,
  ],
  exports: [
    ConfirmPopupComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxSmoothDnDModule,
  ],
})
export class SharedModule {}
