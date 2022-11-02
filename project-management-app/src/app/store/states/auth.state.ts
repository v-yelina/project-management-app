export interface AuthState {
  id: string | null;
  name: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  id: null,
  name: null,
  token: null,
};
