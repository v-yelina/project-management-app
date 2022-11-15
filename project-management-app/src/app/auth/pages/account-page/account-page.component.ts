import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    private dialogRef: MatDialogRef<ConfirmPopupComponent>,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    console.log(localStorage.getItem('AUTH_STATE'));

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

  onConfirmClick() {

  }

  deleteUser() {

  }
}
