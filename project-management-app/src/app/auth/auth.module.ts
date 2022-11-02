import { NgModule } from '@angular/core';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    AccountPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
