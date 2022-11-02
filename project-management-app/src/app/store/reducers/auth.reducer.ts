import { createReducer, on } from '@ngrx/store';
import { logOut, updateAuthState } from '../actions/auth.actions';
import { initialState } from '../states/auth.state';

export const authReducer = createReducer(
  initialState,
  on(updateAuthState, (state, action) => ({
    ...state,
    ...action.payload,
  })),
  on(logOut, () => ({
    ...initialState,
  })),
);
