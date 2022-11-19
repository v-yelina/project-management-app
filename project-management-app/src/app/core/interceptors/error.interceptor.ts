import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { logOut } from 'src/app/store/actions/auth.actions';
import { loaded, setMessage } from 'src/app/store/actions/notifications.actions';
import { Store } from '@ngrx/store';
import { AUTH_STATE } from '../constants/constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (localStorage.getItem(AUTH_STATE)) {
          this.store.dispatch(setMessage({ msg: 'Your token is invalid, please sign in to your account' }));
          this.store.dispatch(logOut());
        }
        if (!localStorage.getItem(AUTH_STATE)) {
          this.store.dispatch(setMessage({ msg: 'The username or password you entered is incorrect' }));
        }
        this.store.dispatch(loaded());
        return throwError(() => error);
      } else if (error.status === 403) {
        this.store.dispatch(setMessage({ msg: 'Your token is invalid, please sign in to your account' }));
        this.store.dispatch(logOut());
        return throwError(() => error);
      } else if (error.status === 404) {
        this.store.dispatch(setMessage({ msg: error.message }));
        return throwError(() => error);
      } else {
        this.store.dispatch(setMessage({ msg: error.message }));
        return throwError(() => error);
      }
    }));
  }
}
