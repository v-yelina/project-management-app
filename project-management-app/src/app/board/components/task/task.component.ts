import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PointsResponse, TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from 'src/app/shared/components/confirm-popup/confirm-popup.models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/core/constants/l10n-config';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';
import { deleteTaskOnServer, updateTaskOnServer } from '../../../store/actions/board.actions';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { loaded } from 'src/app/store/actions/notifications.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() taskData!: TaskResponse;

  points: PointsResponse[] = []

  donePointsPercent = this.getDonePointsPercent();

  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store, private restApi: RestApiService) {
  }

  ngOnInit(): void {
    this.getPoints();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPoints() {
    const points = this.restApi.getPointsByTaskId(this.taskData._id).subscribe(res => {
      this.points.push(...res);
      this.store.dispatch(loaded());
      this.donePointsPercent = this.getDonePointsPercent();
    })
    this.subscription.add(points);
  }

  togglePoint(event: Event, point: PointsResponse) {
    event.stopPropagation()
    const index = this.points.indexOf(point);
    const toggle = this.restApi.updatePointsById({ title: point.title, done: !point.done }, point._id).subscribe(() => {
      this.points[index].done = !this.points[index].done;
      this.store.dispatch(loaded());
      this.donePointsPercent = this.getDonePointsPercent();
    })
    this.subscription.add(toggle);
  }

  getDonePointsPercent(): number {
    return Math.round((this.points.filter(point => point.done).length * 100) / this.points.length);
  }

  openConfirmationDialog() {
    let itemTypeSelected = ItemType.task;
    if (localStorage.getItem('lang') === Languages.russian) {
      itemTypeSelected = ItemType.task_RU;
    }

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        itemType: itemTypeSelected,
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
    let typeSelected = DialogType.EDIT;
    if (localStorage.getItem('lang') === Languages.russian) {
      typeSelected = DialogType.EDIT_RU;
    }

    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        taskData: {
          ...this.taskData,
        },
        points: [...this.points],
        type: typeSelected,
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
