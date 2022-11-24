import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from 'src/app/shared/components/confirm-popup/confirm-popup.models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/core/constants/l10n-config';
import { DialogType, EditTaskComponent } from '../edit-task/edit-task.component';
import { deleteTaskOnServer, updateTaskOnServer } from '../../../store/actions/board.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnDestroy {
  @Input() taskData!: TaskResponse;

  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
