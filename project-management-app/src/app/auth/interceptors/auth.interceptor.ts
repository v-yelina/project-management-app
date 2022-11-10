import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { mergeMap, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../../store/selectors/auth.selectors';
import { APP_API_URL, TOKEN_HEADER_KEY, TOKEN_TYPE } from '../../core/constants/constants';
import { logOut } from '../../store/actions/auth.actions';
import { ResponseError } from '../../core/enums/response-error';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getAuthToken).pipe(
      mergeMap((token) => {
        if (token) {
          const moddedHttpRequest = request.clone({
            headers: request.headers.set(TOKEN_HEADER_KEY, `${TOKEN_TYPE}${token}`),
            url: `${APP_API_URL}${request.url}`,
          });
          return next.handle(moddedHttpRequest);
        }
        return next.handle(request.clone({ url: `${APP_API_URL}${request.url}` })).pipe(
          tap({
            error: (err) => {
              if (err.error.message === ResponseError.INVALID_TOKEN) {
                this.store.dispatch(logOut());
              }
            },
          }),
        );
      }),
    );
  }
}
