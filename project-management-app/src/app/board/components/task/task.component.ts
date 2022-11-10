import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from 'src/app/shared/components/confirm-popup/confirm-popup.models';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  taskData: Pick<TaskResponse, 'description' | 'title' | '_id'> = {
    title: 'New Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    _id: 'sshdh1jsk8767',
  };

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
    this.dialog.open(EditTaskComponent, {
      data: {
        ...this.taskData,
      },
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
