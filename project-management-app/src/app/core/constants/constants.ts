import { HttpHeaders } from '@angular/common/http';

export const APP_API_URL = 'https://pms-api-frxc.onrender.com';
export const TOKEN_HEADER_KEY = 'Authorization';
export const TOKEN_TYPE = 'Bearer ';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
export const AUTH_STATE = 'AUTH_STATE';

export const SIGN_IN_SUCCESS = 'Welcome!';
export const SIGN_UP_SUCCESS = 'Success! Use your login and password for sign in!';
export const BOARD_CREATED = 'Board was created!';
export const BOARD_DELETED = 'Board was deleted!';
export const USER_DELETED = 'User was deleted!';
export const USER_UPDATED = 'New user data was successfully saved!';
