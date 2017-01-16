
import { Action } from '@ngrx/store';


export const GAPI_AUTH_STATE = 'GAPI_AUTH_STATE';

export const GAPI_LOGIN = 'GAPI_LOGIN';


export function gapiAuthSuccess(state: string): Action {
  return {
    type: GAPI_AUTH_STATE,
    payload: state
  };
};

export function gapiLogin(): Action {
  return {
    type: GAPI_LOGIN
  };
};




