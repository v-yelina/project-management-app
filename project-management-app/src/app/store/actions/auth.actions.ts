import { createAction, props } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const updateAuthState = createAction('UPDATE_AUTH_STATE', props<{ payload: AuthState }>());

export const updateAuthStateFromLocalStorage = createAction(
  'UPDATE_AUTH_STATE_FROM_LOCAL_STORAGE',
);

export const logOut = createAction('LOG_OUT');
