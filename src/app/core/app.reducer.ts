import { createReducer, on } from '@ngrx/store';
import { setUser, setToken, clearAuth, setShowLogin } from './app.action';

export interface AppState {
  user: any;
  token: string | null;
  showLogin: boolean;
}

export const initialState: AppState = {
  user: JSON.parse(localStorage.getItem('wave_user') || 'null'),
  token: localStorage.getItem('wave_token'),
  showLogin: false, 
};

export const appReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => {
    localStorage.setItem('wave_user', JSON.stringify(user));
    return { ...state, user };
  }),
  on(setToken, (state, { token }) => {
    if (token) {
      localStorage.setItem('wave_token', token);
    } else {
      localStorage.removeItem('wave_token');
    }
    return { ...state, token };
  }),
  on(clearAuth, (state) => {
    localStorage.removeItem('wave_user'); 
    localStorage.removeItem('wave_token'); 
    return { ...state, user: null, token: null, showLogin: false }; 
  }),
  on(setShowLogin, (state, { showLogin }) => {
    return { ...state, showLogin };
  })
);
