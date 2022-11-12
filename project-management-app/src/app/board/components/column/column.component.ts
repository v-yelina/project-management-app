import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/response-api.models';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  title = 'Column title';

  editMode = false;

  tasks: Pick<TaskResponse, 'description' | 'title' | '_id'>[] = [{
    title: 'First Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    _id: 'sshdh1jsk8767',
  }, {
    title: 'Second Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    _id: 'sshdh1jsk8767',
  }, {
    title: 'Third Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    _id: 'sshdh1jsk8767',
  }, {
    title: 'Fourth Task Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
    _id: 'sshdh1jsk8767',
  }]

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.title, [Validators.required]),
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

  saveColumnTitle() {
    this.title = this.editTitleForm.value.columnTitle;
    this.editMode = false;
  }
}
