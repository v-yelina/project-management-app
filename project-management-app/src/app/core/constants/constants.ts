import { HttpHeaders } from '@angular/common/http';

export const APP_API_URL = 'https://pms-api-frxc.onrender.com';
export const TOKEN_HEADER_KEY = 'Authorization';
export const TOKEN_TYPE = 'Bearer ';
export const INVALID_TOKEN_ERROR = 'Invalid token';
export const AUTHORIZATION_ERROR = 'Authorization error';
export const LOGIN_EXIST_ERROR = 'Login already exist';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export const AUTH_STATE = 'AUTH_STATE';

export const SIGN_IN_SUCCESS = 'Welcome!';
export const SIGN_UP_SUCCESS = 'Use your login and password for sign in!';
