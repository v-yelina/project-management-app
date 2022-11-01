import { HttpHeaders } from '@angular/common/http';

export const APP_API_URL = 'https://pms-api-frxc.onrender.com';
export const TOKEN_HEADER_KEY = 'Authorization';
export const TOKEN_TYPE = 'Bearer ';
export const AUTH_ERROR = 'Invalid token';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export const AUTH_STATE = 'AUTH_STATE';
