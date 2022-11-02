import { ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './reducers/auth.reducer';
import { AuthState } from './states/auth.state';
import { AuthEffects } from './effects/auth.effects';

interface AppState {
  authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
};

export const effects = EffectsModule.forRoot([AuthEffects]);
