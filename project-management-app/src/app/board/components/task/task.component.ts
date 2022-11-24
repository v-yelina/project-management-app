import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PointsResponce, TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from 'src/app/shared/components/confirm-popup/confirm-popup.models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';
import { deleteTaskOnServer, updateTaskOnServer } from '../../../store/actions/board.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnDestroy {
  @Input() taskData!: TaskResponse;

  points: PointsResponce[] = [{
    "_id": "1",
    "title": "First Point title",
    "taskId": "1",
    "boardId": "1",
    "done": false
  }, {
    "_id": "2",
    "title": "Second Point title",
    "taskId": "1",
    "boardId": "1",
    "done": true
  }]

  donePointsPercent = this.getDonePointsPercent();

  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDonePointsPercent(): number {
    return (this.points.filter(point => point.done).length * 100) / this.points.length;
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        itemType: ItemType.task,
      },
    });

    const subDelTask = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTask();
      }
    });
    this.subscription.add(subDelTask);
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

    const subUpdTask = dialogRef.afterClosed().subscribe((result: TaskResponse) => {
      if (result) {
        this.store.dispatch(updateTaskOnServer({ task: { ...result } }));
      }
    });
    this.subscription.add(subUpdTask);
  }

  deleteTask() {
    this.store.dispatch(deleteTaskOnServer({ task: this.taskData }));
  }

  onTaskClick(event: Event) {
    const elem = event.target as HTMLElement;
    if (!elem.classList.contains('task__btn--delete')) {
      this.openEditDialog();
    }
  }
}
