import { createAction, props } from '@ngrx/store';

export const setUser = createAction('[App] Set User', props<{ user: any }>());
export const setToken = createAction('[App] Set Token', props<{ token: string | null }>());
export const setShowLogin = createAction('[App] Set Show Login', props<{ showLogin: boolean }>());
export const clearAuth = createAction('[App] Clear Auth');