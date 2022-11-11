import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  title = 'Column title';

  editMode = false;

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.title, [Validators.required]),
  });

  constructor(private dialog: MatDialog) {}

  turnOnEditMode() {
    this.editMode = true;
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: 'Are you sure want to exit without saving changes?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        dialogRef.close();
        this.editMode = false;
      }
    });
  }

  saveColumnTitle() {
    this.title = this.editTitleForm.value.columnTitle;
    this.editMode = false;
  }
}
