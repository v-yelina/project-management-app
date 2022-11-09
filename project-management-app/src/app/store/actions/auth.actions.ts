import { createAction, props } from '@ngrx/store';
import { AuthState } from '../states/auth.state';
import { UserCredentials } from '../../auth/models/user-credentials.model';

export const updateAuthState = createAction('UPDATE_AUTH_STATE', props<{ payload: AuthState }>());

export const updateAuthStateFromLocalStorage = createAction('UPDATE_AUTH_STATE_FROM_LOCAL_STORAGE');

export const logOut = createAction('LOG_OUT');

export const signIn = createAction(
  'SIGN_IN',
  props<{ payload: Pick<UserCredentials, 'login' | 'password'> }>(),
);

export const signUp = createAction('SIGN_UP', props<{ payload: Required<UserCredentials> }>());

export const getAdditionalUserData = createAction('GET_ADDITIONAL_USER_DATA');

export const setErrorMessage = createAction('SET_ERROR_MESSAGE', props<{ msg: string }>());

export const setResponseMessage = createAction('SET_RESPONSE_MESSAGE', props<{ msg: string }>());