import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from 'src/app/shared/components/confirm-popup/confirm-popup.models';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskData!: TaskResponse;

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        itemType: ItemType.task,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTask(id);
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        taskData: {
          ...this.taskData,
        },
        type: DialogType.EDIT,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskResponse) => {
      if (result) {
        this.taskData = { ...result };
      }
    });
  }

  deleteTask(id: string) {
    console.log(`delete task ${id}`);
  }

  onTaskClick(event: Event) {
    const elem = event.target as HTMLElement;
    if (!elem.classList.contains('task__btn--delete')) {
      this.openEditDialog();
    }
  }
}
