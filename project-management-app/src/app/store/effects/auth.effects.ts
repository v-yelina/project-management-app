import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, of, switchMap, tap, zip } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  getAdditionalUserData,
  logOut,
  signIn,
  signUp,
  updateAuthState,
  updateAuthStateFromLocalStorage,
} from '../actions/auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { AUTH_STATE, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } from '../../core/constants/constants';
import { initialState } from '../states/auth.state';
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
          first(),
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
          // catchError((err) => {
          //   this.store.dispatch(logOut());
          //   return of(setMessage({ msg: err.error.message }));
          // }),
        ),
      ),
    ),
  );

  additionalUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdditionalUserData),
      switchMap(() => zip(this.restApiService.getUsers(), this.store.select(getAuthState))),
      map(([users, state]) => {
        const user = users.find((item) => item.login === state.login) as UserResponse;
        const authState = {
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
        this.store.dispatch(setMessage({ msg: SIGN_IN_SUCCESS }));
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
          first(),
          map(() => setMessage({ msg: SIGN_UP_SUCCESS })),
          tap(() => {
            this.store.dispatch(loaded());
            this.router.navigate(['/', 'login', 'signin']);
          }),
          // catchError((err) => {
          //   return of(setMessage({ msg: err.error.message }));
          // }),
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
  ) { }
}
