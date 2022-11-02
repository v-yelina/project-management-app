import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map, of, switchMap, tap, zip,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getAdditionalUserData,
  logOut, signIn, updateAuthState, updateAuthStateFromLocalStorage,
} from '../actions/auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { AUTH_STATE } from '../../core/constants/constants';
import { initialState } from '../states/auth.state';
import { AuthApiService } from '../../api/auth-api.service';
import { UsersApiService } from '../../api/users-api.service';
import { getAuthState } from '../selectors/auth.selectors';
import { UserResponse } from '../../core/models/response-api.models';

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

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(signIn),
    switchMap((action) => zip(of(action), this.authApiService.signIn(action.payload))),
    map(([action, response]) => updateAuthState({
      payload: {
        token: response.token,
        name: null,
        login: action.payload.login,
        id: null,
      },
    })),
  ));

  additionalUserData$ = createEffect(() => this.actions$.pipe(
    ofType(getAdditionalUserData),
    switchMap(() => zip(this.usersApiService.getUsers(), this.store.select(getAuthState))),
    map(([users, state]) => {
      const user = users.find((item) => item.login === state.login) as UserResponse;
      return updateAuthState({
        payload: {
          ...state,
          name: user.name,
          // eslint-disable-next-line no-underscore-dangle
          id: user._id,
        },
      });
    }),
  ));

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private authApiService: AuthApiService,
    private usersApiService: UsersApiService,
    private store: Store,
  ) {}
}
