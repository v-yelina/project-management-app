import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { RestApiService } from '../../core/services/rest-api.service';
import {
  addCreatedBoard,
  createBoard,
  deleteBoard,
  initUserBoards,
  updateBoardsState,
} from '../actions/boards.actions';
import { getUserId } from '../selectors/auth.selectors';
import { loaded, setMessage } from '../actions/notifications.actions';
import { logOut } from '../actions/auth.actions';
import { BOARD_CREATED, BOARD_DELETED } from '../../core/constants/constants';

@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoard),
      switchMap((action) => {
        return this.restApiService.getUsers().pipe(
          first(),
          map((users) => {
            return users
              .filter((user) => {
                return !!action.payload.members.find((member) => member === user.login);
              })
              .map((user) => {
                return user._id;
              });
          }),
          map((users) => {
            return { ...action.payload, members: users };
          }),
          switchMap((rawBoard) => {
            return this.store.select(getUserId).pipe(
              first(),
              switchMap((userId) => {
                return this.restApiService
                  .createBoard({
                    title: rawBoard.name,
                    owner: userId!,
                    users: rawBoard.members.filter((memberId) => memberId !== userId!),
                  })
                  .pipe(map((board) => addCreatedBoard({ payload: board })));
              }),
            );
          }),
          tap(() => {
            this.store.dispatch(setMessage({ msg: BOARD_CREATED }));
            this.store.dispatch(loaded());
          }),
          catchError((err) => {
            this.store.dispatch(logOut());
            return of(setMessage({ msg: err.error.message }));
          }),
        );
      }),
    ),
  );

  initUserBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUserBoards),
      switchMap(() => {
        return this.store.select(getUserId).pipe(
          first(),
          switchMap((userId) => {
            return this.restApiService.getBoardsByUserId(userId!).pipe(
              first(),
              map((boards) => updateBoardsState({ payload: boards })),
            );
          }),
          tap(() => {
            this.store.dispatch(loaded());
          }),
          catchError((err) => {
            this.store.dispatch(logOut());
            return of(setMessage({ msg: err.error.message }));
          }),
        );
      }),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoard),
      switchMap((action) => {
        return this.restApiService.deleteBoardById(action.boardId).pipe(
          map(() => initUserBoards()),
          tap(() => {
            this.store.dispatch(setMessage({ msg: BOARD_DELETED }));
          }),
          catchError((err) => of(setMessage({ msg: err.error.message }))),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private restApiService: RestApiService,
    private store: Store,
  ) {}
}
