import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColumnResponse, TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() columnData!: ColumnResponse;

  editMode = false;

  tasks: TaskResponse[] = [{
    _id: 'sshdh1jsk8767',
    title: 'First Task Title',
    order: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    boardId: 'firstBoard',
    columnId: 'firstColumn',
    userId: 0,
    users: [],
  }, {
    _id: 'sshdh1jsk8768',
    title: 'Second Task Title',
    order: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    boardId: 'firstBoard',
    columnId: 'firstColumn',
    userId: 0,
    users: [],
  }, {
    _id: 'sshdh1jsk8769',
    title: 'Third Task Title',
    order: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    boardId: 'firstBoard',
    columnId: 'firstColumn',
    userId: 0,
    users: [],
  }, {
    _id: 'sshdh1jsk87610',
    title: 'Fourth Task Title',
    order: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    boardId: 'firstBoard',
    columnId: 'firstColumn',
    userId: 0,
    users: [],
  }]

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.columnData ? this.columnData.title : '', [Validators.required]),
  });

  constructor(private dialog: MatDialog) { }

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

  openCreateDialog() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        taskData: {
          order: this.tasks.length + 1,
          boardId: this.columnData.boardId,
          columnId: this.columnData._id,
          userId: 0,
          users: [],
        }, type: DialogType.CREATE
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskResponse) => {
      this.tasks.push(result)
    });
  }

  saveColumnTitle() {
    this.columnData.title = this.editTitleForm.value.columnTitle;
    this.editMode = false;
  }
}
