import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardResponse, ColumnResponse } from 'src/app/core/models/response-api.models';
import { CreateColumnComponent } from '../../components/create-column/create-column.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  boardData: BoardResponse = {
    _id: 'firstBoard',
    title: 'First Board Title',
    owner: 'new owner',
    users: [],
  };

  columns: ColumnResponse[] = [
    {
      _id: 'firstColumn',
      title: 'First Column title',
      order: 0,
      boardId: 'firstBoard',
    },
    {
      _id: 'secondColumn',
      title: 'Second Column title',
      order: 1,
      boardId: 'firstBoard',
    },
    {
      _id: 'thirdColumn',
      title: 'Third Column title',
      order: 2,
      boardId: 'firstBoard',
    },
    {
      _id: 'fourthColumn',
      title: 'FourthColumn title',
      order: 3,
      boardId: 'firstBoard',
    },
  ];

  constructor(private dialog: MatDialog) {}

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      data: {
        columnData: {
          order: this.columns.length + 1,
          boardId: this.boardData._id,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result: ColumnResponse) => {
      this.columns.push(result);
    });
  }
}
