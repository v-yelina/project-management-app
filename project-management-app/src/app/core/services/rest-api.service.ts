import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../../auth/models/user-credentials.model';
import {
  AuthEndpoint,
  BoardsEndpoint,
  ColumnsEndpoint,
  TasksEndpoint,
  UsersEndpoint,
  PointsEndpoint,
} from '../enums/endpoints';
import { HTTP_OPTIONS } from '../constants/constants';
import {
  BoardResponse,
  ColumnResponse,
  TaskResponse,
  UserResponse,
  PointsResponse,
} from '../models/response-api.models';
import { Board } from '../models/board.models';
import { Column, PartialColumnWithOrder } from '../models/column.model';
import { PartialTaskWithOrder, Task, TaskWithColumnId } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  signIn(credentials: Pick<UserCredentials, 'login' | 'password'>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(AuthEndpoint.SIGN_IN, credentials, {
      ...HTTP_OPTIONS,
    });
  }

  signUp(credentials: Required<UserCredentials>): Observable<UserResponse> {
    return this.http.post<UserResponse>(AuthEndpoint.SIGN_UP, credentials, {
      ...HTTP_OPTIONS,
    });
  }

  updateUserById(credentials: Required<UserCredentials>, id: string): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${UsersEndpoint.USERS}/${id}`, credentials, {
      ...HTTP_OPTIONS,
    });
  }

  deleteUserById(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${UsersEndpoint.USERS}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  getUsers(): Observable<Array<UserResponse>> {
    return this.http.get<Array<UserResponse>>(UsersEndpoint.USERS, {
      ...HTTP_OPTIONS,
    });
  }

  getBoards(): Observable<Array<BoardResponse>> {
    return this.http.get<Array<BoardResponse>>(BoardsEndpoint.BOARDS, {
      ...HTTP_OPTIONS,
    });
  }

  createBoard(board: Board): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(BoardsEndpoint.BOARDS, board, {
      ...HTTP_OPTIONS,
    });
  }

  getBoardById(id: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${BoardsEndpoint.BOARDS}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  updateBoardById(board: Board, id: string): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${BoardsEndpoint.BOARDS}/${id}`, board, {
      ...HTTP_OPTIONS,
    });
  }

  deleteBoardById(id: string): Observable<BoardResponse> {
    return this.http.delete<BoardResponse>(`${BoardsEndpoint.BOARDS}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  getBoardsByIds(ids: Array<string>): Observable<Array<BoardResponse>> {
    return this.http.get<Array<BoardResponse>>(BoardsEndpoint.BOARDS_SET, {
      ...HTTP_OPTIONS,
      params: { ids: ids.join(',') },
    });
  }

  getBoardsByUserId(id: string): Observable<Array<BoardResponse>> {
    return this.http.get<Array<BoardResponse>>(`${BoardsEndpoint.BOARDS_SET}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  getColumns(boardId: string): Observable<Array<ColumnResponse>> {
    return this.http.get<Array<ColumnResponse>>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  createColumn(column: Column, boardId: string): Observable<ColumnResponse> {
    return this.http.post<ColumnResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}`,
      column,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  getColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    return this.http.get<ColumnResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${id}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  updateColumnById(column: Column, id: string, boardId: string): Observable<ColumnResponse> {
    return this.http.put<ColumnResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${id}`,
      column,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  deleteColumnById(id: string, boardId: string): Observable<ColumnResponse> {
    return this.http.delete<ColumnResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${id}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  getColumnsByIds(ids: Array<string>): Observable<Array<ColumnResponse>> {
    return this.http.get<Array<ColumnResponse>>(ColumnsEndpoint.COLUMNS_SET, {
      ...HTTP_OPTIONS,
      params: { ids: ids.join(',') },
    });
  }

  getColumnsByUserId(id: string): Observable<Array<ColumnResponse>> {
    return this.http.get<Array<ColumnResponse>>(ColumnsEndpoint.COLUMNS_SET, {
      ...HTTP_OPTIONS,
      params: { userId: id },
    });
  }

  updateOrderColumns(columns: Array<PartialColumnWithOrder>): Observable<Array<ColumnResponse>> {
    return this.http.patch<Array<ColumnResponse>>(ColumnsEndpoint.COLUMNS_SET, columns, {
      ...HTTP_OPTIONS,
    });
  }

  createColumns(columns: Array<Required<Column>>): Observable<Array<ColumnResponse>> {
    return this.http.post<Array<ColumnResponse>>(ColumnsEndpoint.COLUMNS_SET, columns, {
      ...HTTP_OPTIONS,
    });
  }

  getTasks(boardId: string, columnId: string): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${columnId}${TasksEndpoint.TASKS}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  createTask(task: Task, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${columnId}${TasksEndpoint.TASKS}`,
      task,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  getTaskById(id: string, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${columnId}${TasksEndpoint.TASKS}/${id}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  updateTaskById(
    task: TaskWithColumnId,
    id: string,
    boardId: string,
    columnId: string,
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${columnId}${TasksEndpoint.TASKS}/${id}`,
      task,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  deleteTaskById(id: string, boardId: string, columnId: string): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(
      `${BoardsEndpoint.BOARDS}/${boardId}${ColumnsEndpoint.COLUMNS}/${columnId}${TasksEndpoint.TASKS}/${id}`,
      {
        ...HTTP_OPTIONS,
      },
    );
  }

  getTasksByIds(ids: Array<string>): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(TasksEndpoint.TASKS_SET, {
      ...HTTP_OPTIONS,
      params: { ids: ids.join(',') },
    });
  }

  getTasksByUserId(id: string): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(TasksEndpoint.TASKS_SET, {
      ...HTTP_OPTIONS,
      params: { userId: id },
    });
  }

  getTasksByKeyword(keyword: string): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(TasksEndpoint.TASKS_SET, {
      ...HTTP_OPTIONS,
      params: { search: keyword },
    });
  }

  updateOrderTasks(tasks: Array<PartialTaskWithOrder>): Observable<Array<TaskResponse>> {
    return this.http.patch<Array<TaskResponse>>(TasksEndpoint.TASKS_SET, tasks, {
      ...HTTP_OPTIONS,
    });
  }

  getTasksByBoardId(id: string): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(`${TasksEndpoint.TASKS_SET}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  getPointsByTaskId(id: string): Observable<Array<PointsResponse>> {
    return this.http.get<Array<PointsResponse>>(`${PointsEndpoint.POINTS}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }

  createPoint(point: Omit<PointsResponse, '_id'>): Observable<PointsResponse> {
    return this.http.post<PointsResponse>(PointsEndpoint.POINTS, point, {
      ...HTTP_OPTIONS,
    });
  }

  updatePointsById(
    point: Pick<PointsResponse, 'title' | 'done'>,
    id: string,
  ): Observable<PointsResponse> {
    return this.http.patch<PointsResponse>(`${PointsEndpoint.POINTS}/${id}`, point, {
      ...HTTP_OPTIONS,
    });
  }

  deletePointsById(id: string): Observable<PointsResponse> {
    return this.http.delete<PointsResponse>(`${PointsEndpoint.POINTS}/${id}`, {
      ...HTTP_OPTIONS,
    });
  }
}
