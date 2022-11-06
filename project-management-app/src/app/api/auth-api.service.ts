import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../auth/models/user-credentials.model';
import { AuthEndpoint } from '../core/enums/endpoints';
import { HTTP_OPTIONS } from '../core/constants/constants';
import { UserResponse } from '../core/models/response-api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
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
}
