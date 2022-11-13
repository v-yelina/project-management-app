import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { PasswordErrorStateMatcher } from './password-error-state-matcher';
import { signUp } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordHasCapitalAndSmallCase,
        this.passwordHasLettersAndNumbers,
        this.passwordHasSpecialCharacter,
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    this.passwordEquals,
  );

  passwordEqualsMatcher = new PasswordErrorStateMatcher();

  constructor(private store: Store, public dialog: MatDialog) {}

  displayFormControlErrorMessage(formControlName: string, typeError: string): boolean {
    return (
      this.signUpForm.controls[formControlName].hasError(typeError) &&
      this.signUpForm.controls[formControlName].touched
    );
  }

  passwordHasCapitalAndSmallCase(control: FormControl): { [k: string]: boolean } | null {
    if (!/[a-z]/g.test(control.value) || !/[A-Z]/g.test(control.value)) {
      return { capitalAndSmallCase: true };
    }
    return null;
  }

  passwordHasLettersAndNumbers(control: FormControl): { [k: string]: boolean } | null {
    if (!/[a-z]/gi.test(control.value) || !/[0-9]/g.test(control.value)) {
      return { lettersAndNumbers: true };
    }
    return null;
  }

  passwordHasSpecialCharacter(control: FormControl): { [k: string]: boolean } | null {
    if (!/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(control.value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  passwordEquals(control: AbstractControl): { [k: string]: boolean } | null {
    if (control.get('password')?.value !== control.get('repeatPassword')?.value) {
      return { passwordEquals: true };
    }
    return null;
  }

  fixStyles(event: Event) {
    const fixInputField = this.getParentElement(event.target as HTMLElement, 3);
    const fieldSubscriptWrapper = fixInputField.querySelector('.mat-form-field-subscript-wrapper');
    if (fieldSubscriptWrapper) {
      (fieldSubscriptWrapper as HTMLElement).style.position = 'static';
      fixInputField.style.height = '52.06px';
    }
  }

  private getParentElement(elem: HTMLElement, times: number) {
    let result = elem;
    for (let i = 1; i <= times; i += 1) {
      result = result.parentElement as HTMLElement;
    }
    return result;
  }

  submit() {
    const payload = { ...this.signUpForm.value };
    delete payload.repeatPassword;
    this.store.dispatch(signUp({ payload }));
  }
}
