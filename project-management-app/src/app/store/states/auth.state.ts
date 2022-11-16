export interface AuthState {
  id: string | null;
  name: string | null;
  login: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  id: null,
  name: null,
  login: null,
  token: null,
};
