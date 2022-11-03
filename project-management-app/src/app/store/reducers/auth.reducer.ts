import { createReducer, on } from '@ngrx/store';
import {
  logOut, setErrorMessage, setResponseMessage, updateAuthState,
} from '../actions/auth.actions';
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
  on(setErrorMessage, (state, action) => ({ ...state, responseMessage: action.msg })),
  on(setResponseMessage, (state, action) => ({ ...state, responseMessage: action.msg })),
);
