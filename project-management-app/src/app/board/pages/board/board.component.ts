import { Component, OnInit } from '@angular/core';
import { ColumnResponse } from 'src/app/core/models/response-api.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  columns: ColumnResponse[] = [{
    _id: 'firstColumn',
    title: 'First Column title',
    order: 0,
    boardId: 'firstBoard'
  }, {
    _id: 'secondColumn',
    title: 'Second Column title',
    order: 1,
    boardId: 'firstBoard'
  }, {
    _id: 'thirdColumn',
    title: 'Third Column title',
    order: 2,
    boardId: 'firstBoard'
  }, {
    _id: 'fourthColumn',
    title: 'FourthColumn title',
    order: 3,
    boardId: 'firstBoard'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
