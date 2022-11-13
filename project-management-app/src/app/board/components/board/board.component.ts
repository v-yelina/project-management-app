import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DELETE_BOARD, OPEN_BOARD } from './constants';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';
import { ItemType } from '../../../shared/components/confirm-popup/confirm-popup.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy {
  @Input() boardTitle =
    ' Angular Live Development Server is listening on localhost:4200, open your browser ';

  @Input() totalMembers = 0;

  @Input() boardId = '';

  @Output() boardAction = new EventEmitter<{ type: string; id: string }>();

  subscription = new Subscription();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openBoard(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (
      targetElement.tagName === 'BUTTON' ||
      (targetElement.tagName === 'MAT-ICON' &&
        !targetElement.classList.contains('total-members__icon'))
    ) {
      event.stopPropagation();
    } else {
      this.boardAction.emit({ type: OPEN_BOARD, id: this.boardId });
    }
  }

  deleteBoard() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        itemType: ItemType.board,
      },
    });

    const subConfirm = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.boardAction.emit({ type: DELETE_BOARD, id: this.boardId });
      }
    });
    this.subscription.add(subConfirm);
  }
}