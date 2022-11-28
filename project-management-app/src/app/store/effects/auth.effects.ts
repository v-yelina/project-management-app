import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, of, switchMap, tap, zip } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Languages } from 'src/app/core/constants/l10n-config';
import {
  deleteUser,
  updateUserData,
  getAdditionalUserData,
  logOut,
  signIn,
  signUp,
  updateAuthState,
  updateAuthStateFromLocalStorage,
} from '../actions/auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import {
  AUTH_STATE,
  SIGN_IN_SUCCESS_EN,
  SIGN_IN_SUCCESS_RU,
  SIGN_UP_SUCCESS_EN,
  SIGN_UP_SUCCESS_RU,
  USER_DELETED,
  USER_UPDATED,
} from '../../core/constants/constants';
import { AuthState, initialState } from '../states/auth.state';
import { getAuthState } from '../selectors/auth.selectors';
import { UserResponse } from '../../core/models/response-api.models';
import { RestApiService } from '../../core/services/rest-api.service';
import { loaded, setMessage } from '../actions/notifications.actions';

@Injectable()
export class AuthEffects {
  authStateFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthStateFromLocalStorage),
      switchMap(() => {
        const state = this.localStorageService.getItem(AUTH_STATE);
        if (state) {
          return of(updateAuthState({ payload: JSON.parse(state) }));
        }
        return of(updateAuthState({ payload: initialState }));
      }),
    ),
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      map(() => updateAuthState({ payload: initialState })),
      tap(() => {
        this.localStorageService.removeItem(AUTH_STATE);
        this.store.dispatch(loaded());
        this.router.navigate(['/', 'welcome']);
      }),
    ),
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap((action) =>
        this.restApiService.signIn(action.payload).pipe(
          filter((response) => response !== null),
          map((response) =>
            updateAuthState({
              payload: {
                token: response.token,
                name: null,
                login: action.payload.login,
                id: null,
              },
            }),
          ),
        ),
      ),
    ),
  );

  additionalUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdditionalUserData),
      switchMap(() => zip(this.restApiService.getUsers(), this.store.select(getAuthState))),
      filter(([users, state]) => users !== null && state !== null),
      map(([users, state]) => {
        const user = users.find((item) => item.login === state.login) as UserResponse;
        const authState: AuthState = {
          ...state,
          name: user.name,
          id: user._id,
        };
        this.localStorageService.setItem(
          AUTH_STATE,
          JSON.stringify({
            id: authState.id,
            name: authState.name,
            login: authState.login,
            token: authState.token,
          }),
        );

        return updateAuthState({
          payload: authState,
        });
      }),
      tap(() => {
        if (localStorage.getItem('lang') === Languages.english) {
          this.store.dispatch(setMessage({ msg: SIGN_IN_SUCCESS_EN }));
        } else {
          this.store.dispatch(setMessage({ msg: SIGN_IN_SUCCESS_RU }));
        }
        this.store.dispatch(loaded());
        this.router.navigate(['/', 'boards']);
      }),
    ),
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap((action) =>
        this.restApiService.signUp(action.payload).pipe(
          filter((response) => response !== null),
          map(() =>
            localStorage.getItem('lang') === Languages.english
              ? setMessage({ msg: SIGN_UP_SUCCESS_EN })
              : setMessage({ msg: SIGN_UP_SUCCESS_RU }),
          ),
          tap(() => {
            this.store.dispatch(loaded());
            this.router.navigate(['/', 'login', 'signin']);
          }),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.restApiService.deleteUserById(action.payload.id).pipe(
          filter((response) => response !== null),
          map(() => logOut()),
          tap(() => {
            this.store.dispatch(setMessage({ msg: USER_DELETED }));
            this.store.dispatch(loaded());
          }),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserData),
      switchMap((action) =>
        this.restApiService.updateUserById(action.payload.credentials, action.payload.id).pipe(
          filter((response) => response !== null),
          map(() => {
            const { token } = JSON.parse(this.localStorageService.getItem(AUTH_STATE) as string);
            this.localStorageService.setItem(
              AUTH_STATE,
              JSON.stringify({
                id: action.payload.id,
                name: action.payload.credentials.name,
                login: action.payload.credentials.login,
                token,
              }),
            );

            return updateAuthStateFromLocalStorage();
          }),
          tap(() => {
            this.store.dispatch(setMessage({ msg: USER_UPDATED }));
            this.store.dispatch(loaded());
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private restApiService: RestApiService,
    private store: Store,
    private router: Router,
  ) {}
}
