import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent {
  title = '';

  createColumnForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { columnData: Partial<ColumnResponse> },
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
  ) {}

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: 'Are you sure want to exit without saving changes?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dialogRef.close();
      }
    });
  }

  onConfirmClick() {
    this.dialogRef.close({
      title: this.createColumnForm.value.title,
      order: this.data.columnData.order,
      boardId: this.data.columnData.boardId,
    });
  }
}
