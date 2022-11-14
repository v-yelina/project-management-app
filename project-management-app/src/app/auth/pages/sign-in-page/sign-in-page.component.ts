import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { getAuthState, getResponseMessage } from '../../../store/selectors/auth.selectors';
import { InfoPopupComponent } from '../../../shared/components/info-popup/info-popup.component';
import {
  getAdditionalUserData,
  setResponseMessage,
  signIn,
} from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit, OnDestroy {
  signInForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  subscription = new Subscription();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) {}

  ngOnInit() {
    const subMsg = this.store.select(getResponseMessage).subscribe((msg) => {
      if (msg) {
        this.dialog.open(InfoPopupComponent, {
          data: { msg },
        });
        this.store.dispatch(setResponseMessage({ msg: null }));
      }
    });
    this.subscription.add(subMsg);

    const subToken = this.store.select(getAuthState).subscribe((authState) => {
      if (authState.token && !authState.name) {
        this.store.dispatch(getAdditionalUserData());
      }
    });
    this.subscription.add(subToken);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayFormControlErrorMessage(formControlName: string, typeError: string): boolean {
    return (
      this.signInForm.controls[formControlName].hasError(typeError) &&
      this.signInForm.controls[formControlName].touched
    );
  }

  submit() {
    this.store.dispatch(signIn({ payload: this.signInForm.value }));
  }
}
