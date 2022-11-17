import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { RawBoard } from '../../../core/models/board.models';

@Component({
  selector: 'app-create-board-popup',
  templateUrl: './create-board-popup.component.html',
  styleUrls: ['./create-board-popup.component.scss'],
})
export class CreateBoardPopupComponent {
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  members: Array<string> = [];

  boardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<CreateBoardPopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.members.push(value);
    }

    event.chipInput!.clear();
  }

  remove(member: string): void {
    const index = this.members.indexOf(member);

    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }

  getInputResults(): RawBoard {
    return { name: this.boardForm.get('name')?.value as string, members: this.members };
  }
}
