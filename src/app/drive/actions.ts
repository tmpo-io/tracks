
import { Action } from '@ngrx/store';


export const GAPI_AUTH_STATE = 'GAPI_AUTH';


export function gapiAuthSuccess(state: string): Action {
  return {
    type: GAPI_AUTH_STATE,
    payload: state
  };
};


