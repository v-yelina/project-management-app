import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { AuthState } from './states/auth.state';

interface AppState {
  authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
};
