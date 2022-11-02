import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, tap } from 'rxjs';
import { logOut, updateAuthState, updateAuthStateFromLocalStorage } from '../actions/auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { AUTH_STATE } from '../../core/constants/constants';
import { initialState } from '../states/auth.state';

@Injectable()
export class AuthEffects {
  authStateFromLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(updateAuthStateFromLocalStorage),
    switchMap(() => {
      const state = this.localStorageService.getItem(AUTH_STATE);
      if (state) {
        return of(updateAuthState({ payload: JSON.parse(state) }));
      }
      return of(updateAuthState({ payload: initialState }));
    }),
  ));

  logOut$ = createEffect(() => this.actions$.pipe(
    ofType(logOut),
    tap(() => {
      this.localStorageService.clearAll();
    }),
  ), { dispatch: false });

  constructor(private actions$: Actions, private localStorageService: LocalStorageService) {}
}
