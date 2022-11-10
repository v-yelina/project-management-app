import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {

  title = 'Column title';
  editMode = false;

  editTitleForm: FormGroup = new FormGroup({
    columnTitle: new FormControl(this.title, [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
