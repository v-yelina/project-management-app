import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const getAuthState = createFeatureSelector<AuthState>('authState');

export const getAuthToken = createSelector(getAuthState, (authState) => authState.token);

export const getUserId = createSelector(getAuthState, (authState) => authState.id);
