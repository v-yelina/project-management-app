import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

export enum DialogType {
  CREATE = 'Create',
  EDIT = 'Edit'
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  dialogType!: DialogType;
  id = '';

  title = '';

  description = '';

  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { taskData: Partial<TaskResponse>, type: DialogType },
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
  ) {
    if (this.data) {
      this.dialogType = data.type;
      this.id = data.taskData._id || '';
      this.title = data.taskData.title || '';
      this.description = data.taskData.description || '';
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
    this.dialogRef.close({
      _id: this.data.taskData._id || '',
      title: this.editTaskForm.value.title,
      order: this.data.taskData.order,
      description: this.editTaskForm.value.description,
      boardId: this.data.taskData.boardId,
      columnId: this.data.taskData.columnId,
      userId: this.data.taskData.userId,
      users: this.data.taskData.users,
    });
  }
}
