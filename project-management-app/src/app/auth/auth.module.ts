import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

import { NotFoundPageComponent } from '../core/pages/not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'signin', component: SignInPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'profile', component: AccountPageComponent },
  { path: '', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent, AccountPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
// fix
