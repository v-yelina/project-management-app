import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  id = '';

  title = '';

  description = '';

  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Pick<TaskResponse, '_id' | 'description' | 'title'>,
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
  ) {
    if (this.data) {
      this.id = data._id;
      this.title = data.title;
      this.description = data.description;
      this.editTaskForm.setValue({ title: this.title, description: this.description });
    }
  }

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
    // edit task
    this.dialogRef.close();
  }
}
