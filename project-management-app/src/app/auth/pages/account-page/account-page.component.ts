import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AUTH_STATE } from 'src/app/core/constants/constants';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { deleteUser, logOut } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/states/auth.state';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  userData: Omit<AuthState, 'responseMessage'> = {
    ...JSON.parse(localStorage.getItem(AUTH_STATE) as string),
  };

  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private dialogRef: MatDialogRef<ConfirmPopupComponent>, private dialog: MatDialog, private store: Store,) { }

  ngOnInit(): void {
    this.editProfileForm.setValue({ name: this.userData.name || '', login: this.userData.login || '' });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        message: 'Are you sure want to exit without saving changes?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dialogRef.close();
      }
    });
  }

  onConfirmClick() { }

  deleteUser() {
    this.store.dispatch(deleteUser({ payload: { id: this.userData.id as string } }))
  }
}
