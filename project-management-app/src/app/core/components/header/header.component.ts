import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logOut, updateAuthStateFromLocalStorage } from '../../../store/actions/auth.actions';
import { getUserId } from '../../../store/selectors/auth.selectors';
import { CreateBoardPopupComponent } from '../../../shared/components/create-board-popup/create-board-popup.component';
import { RawBoard } from '../../models/board.models';
import { createBoard } from '../../../store/actions/boards.actions';
import { getLoadStatus, getMessage } from '../../../store/selectors/notifications.selectors';
import { setMessage } from '../../../store/actions/notifications.actions';
import { NotificationSnackBarComponent } from '../../../shared/components/notification-snack-bar/notification-snack-bar.component';

const SNACK_BAR_TIME_DELAY_MS = 1500;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;

  isLoad = false;

  subscription = new Subscription();

  constructor(private store: Store, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.store.dispatch(updateAuthStateFromLocalStorage());

    const subUserId = this.store.select(getUserId).subscribe((id) => {
      this.isLogged = !!id;
    });
    this.subscription.add(subUserId);

    const subMsg = this.store.select(getMessage).subscribe((msg) => {
      if (msg) {
        this.snackBar.openFromComponent(NotificationSnackBarComponent, {
          data: msg,
          duration: SNACK_BAR_TIME_DELAY_MS,
        });
        this.store.dispatch(setMessage({ msg: null }));
      }
    });
    this.subscription.add(subMsg);

    const subLoad = this.store.select(getLoadStatus).subscribe((status) => {
      this.isLoad = status;
    });
    this.subscription.add(subLoad);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.isLogged = false;
    this.store.dispatch(logOut());
  }

  openCreateBoard() {
    const dialogRef = this.dialog.open(CreateBoardPopupComponent);
    const subRawBoard = dialogRef.afterClosed().subscribe((rawBoard: RawBoard) => {
      if (rawBoard) {
        this.store.dispatch(createBoard({ payload: rawBoard }));
      }
    });
    this.subscription.add(subRawBoard);
  }
}
