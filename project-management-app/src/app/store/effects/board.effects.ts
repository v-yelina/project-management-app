import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, zip } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { RestApiService } from '../../core/services/rest-api.service';
import {
  addCreatedColumn,
  addCreatedTask,
  createColumn,
  createTaskOnServer,
  deleteColumn,
  deleteColumnOnServer,
  deleteTask,
  deleteTaskOnServer,
  initBoardState,
  setColumnsOrderOnServer,
  setTasksOrderOnServer,
  transformDataAfterInit,
  updateColumn,
  updateColumnOnServer,
  updateTask,
  updateTaskOnServer,
} from '../actions/board.actions';
import { loaded, setMessage } from '../actions/notifications.actions';
import { ColumnWithTasks } from '../states/board.state';
import { PartialColumnWithOrder } from '../../core/models/column.model';
import { TaskResponse } from '../../core/models/response-api.models';
import { PartialTaskWithOrder } from '../../core/models/task.models';

@Injectable()
export class BoardEffects {
  initBoardState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initBoardState),
      switchMap((action) =>
        zip(
          this.restApiService.getBoardById(action.id),
          this.restApiService.getColumns(action.id),
          this.restApiService.getTasksByBoardId(action.id),
        ).pipe(
          map(([board, columns, tasks]) => {
            return transformDataAfterInit({ board, columns, tasks });
          }),
          catchError((err) =>
            of(setMessage({ msg: err.error.message ? err.error.message : 'err 1' })),
          ),
        ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  setColumnsOrderOnServer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setColumnsOrderOnServer),
        switchMap((action) =>
          this.restApiService
            .updateOrderColumns(this.transformColumnsForRequest(action.columns))
            .pipe(
              catchError((err) =>
                of(
                  setMessage({
                    msg: err.error.message ? err.error.message : 'err 2',
                  }),
                ),
              ),
            ),
        ),
        tap(() => {
          this.store.dispatch(loaded());
        }),
      ),
    { dispatch: false },
  );

  setTasksOrderOnServer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setTasksOrderOnServer),
        switchMap((action) =>
          this.restApiService
            .updateOrderTasks(this.transformTasksForRequest(action.tasks, action.newColumnId))
            .pipe(
              catchError((err) =>
                of(
                  setMessage({
                    msg: err.error.message ? err.error.message : 'err 3',
                  }),
                ),
              ),
            ),
        ),
        tap(() => {
          this.store.dispatch(loaded());
        }),
      ),
    { dispatch: false },
  );

  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createColumn),
      switchMap((action) =>
        this.restApiService
          .createColumn(
            {
              title: action.column.title,
              order: action.column.order,
            },
            action.boardId,
          )
          .pipe(
            map((createdColumn) => addCreatedColumn({ column: createdColumn })),
            catchError((err) =>
              of(
                setMessage({
                  msg: err.error.message ? err.error.message : 'err 4',
                }),
              ),
            ),
          ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteColumnOnServer),
      switchMap((action) =>
        this.restApiService.deleteColumnById(action.column._id, action.column.boardId).pipe(
          map(() => deleteColumn({ column: action.column })),
          catchError((err) =>
            of(
              setMessage({
                msg: err.error.message ? err.error.message : 'err 5',
              }),
            ),
          ),
        ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateColumnOnServer),
      switchMap((action) =>
        this.restApiService
          .updateColumnById(
            { title: action.column.title, order: action.column.order },
            action.column._id,
            action.column.boardId,
          )
          .pipe(
            map(() => updateColumn({ column: action.column })),
            catchError((err) =>
              of(
                setMessage({
                  msg: err.error.message ? err.error.message : 'err 6',
                }),
              ),
            ),
          ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTaskOnServer),
      switchMap((action) =>
        this.restApiService.createTask(action.task, action.boardId, action.columnId).pipe(
          map((createdTask) => addCreatedTask({ task: createdTask })),
          catchError((err) =>
            of(
              setMessage({
                msg: err.error.message ? err.error.message : 'err 7',
              }),
            ),
          ),
        ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskOnServer),
      switchMap((action) =>
        this.restApiService
          .updateTaskById(
            {
              title: action.task.title,
              order: action.task.order,
              description: action.task.description,
              userId: action.task.userId,
              users: action.task.users,
              columnId: action.task.columnId,
            },
            action.task._id,
            action.task.boardId,
            action.task.columnId,
          )
          .pipe(
            map(() => updateTask({ task: action.task })),
            catchError((err) =>
              of(
                setMessage({
                  msg: err.error.message ? err.error.message : 'err 8',
                }),
              ),
            ),
          ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskOnServer),
      switchMap((action) =>
        this.restApiService
          .deleteTaskById(action.task._id, action.task.boardId, action.task.columnId)
          .pipe(
            map(() => deleteTask({ task: action.task })),
            catchError((err) =>
              of(
                setMessage({
                  msg: err.error.message ? err.error.message : 'err 9',
                }),
              ),
            ),
          ),
      ),
      tap(() => {
        this.store.dispatch(loaded());
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private restApiService: RestApiService,
    private store: Store,
  ) { }

  private transformColumnsForRequest(
    columns: Array<ColumnWithTasks>,
  ): Array<PartialColumnWithOrder> {
    return columns.map((column) => {
      return { _id: column._id, order: column.order };
    });
  }

  private transformTasksForRequest(
    tasks: Array<TaskResponse>,
    columnId: string,
  ): Array<PartialTaskWithOrder> {
    return tasks.map((task) => {
      return { _id: task._id, order: task.order, columnId };
    });
  }
}
