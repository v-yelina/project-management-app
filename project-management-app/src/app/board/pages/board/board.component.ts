import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  columns = [{ title: 'Column1' }, { title: 'Column2' }, { title: 'Column3' }, { title: 'Column4' }, { title: 'Column5' }, { title: 'Column6' }]

  constructor() { }

  ngOnInit(): void {
  }

}
