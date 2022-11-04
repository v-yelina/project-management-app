import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmData } from './confirm-popup.models';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})

export class ConfirmPopupComponent {
  confirmMessage = "Are you sure?"
  confirmDeleteMessage = "Are you sure you want to delete this"
  confirmButtonText = "Confirm"
  cancelButtonText = "Cancel"
  constructor(@Inject(MAT_DIALOG_DATA) private data: ConfirmData, private dialogRef: MatDialogRef<ConfirmPopupComponent>) {
    if (this.data) {
      this.confirmMessage = this.data.message
        || `${this.confirmDeleteMessage} ${this.data.itemType}?`
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
