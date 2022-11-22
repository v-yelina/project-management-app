import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { Store } from '@ngrx/store';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';
import { ColumnWithTasks } from '../../../store/states/board.state';
import {
  createTaskOnServer,
  deleteColumnOnServer,
  updateColumnOnServer,
} from '../../../store/actions/board.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() columnData!: ColumnWithTasks;

  editMode = false;

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.columnData ? this.columnData.title : '', [
      Validators.required,
    ]),
  });

  constructor(private dialog: MatDialog, private store: Store) {}

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
          order: this.columnData.tasks.length,
          boardId: this.columnData.boardId,
          columnId: this.columnData._id,
          userId: 0,
          users: [],
        },
        type: DialogType.CREATE,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskResponse) => {
      this.store.dispatch(
        createTaskOnServer({
          task: {
            title: result.title,
            order: result.order,
            description: result.description,
            userId: result.userId,
            users: result.users,
          },
          boardId: result.boardId,
          columnId: result.columnId,
        }),
      );
    });
  }

  saveColumnTitle() {
    this.columnData.title = this.editTitleForm.value.columnTitle;
    this.store.dispatch(updateColumnOnServer({ column: this.columnData }));
    this.editMode = false;
  }

  handleDeleteColumn() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: 'Are you sure want delete column?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteColumnOnServer({ column: this.columnData }));
        dialogRef.close();
      }
    });
  }
}
