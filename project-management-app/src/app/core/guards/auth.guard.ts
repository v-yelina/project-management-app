import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AUTH_STATE } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canLoad(): boolean {
    return this.canActivate();
  }

  canActivate(): boolean {
    const authData = localStorage.getItem(AUTH_STATE);

    if (!authData) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }
}
