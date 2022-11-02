import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../core/models/response-api.models';
import { UsersEndpoint } from '../core/enums/endpoints';
import { HTTP_OPTIONS } from '../core/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<UserResponse>> {
    return this.http.get<Array<UserResponse>>(UsersEndpoint.USERS, {
      ...HTTP_OPTIONS,
    });
  }
}
