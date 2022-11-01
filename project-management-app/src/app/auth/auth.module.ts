import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';



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
