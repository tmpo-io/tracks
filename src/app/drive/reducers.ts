
import { Action } from '@ngrx/store';

import * as actions from './actions';

type AuthStateResult = 'pending' | 'success' | 'notlogged';

export class AppState {
  authState: AuthStateResult;
}

const initial: AppState = {
  authState: 'pending'
};


export function reducerGDrive(state = initial, action: Action): AppState {

  switch (action.type) {
    case actions.GAPI_AUTH_STATE: {
      state = Object.assign({}, state, {
        authState: action.payload
      });
    }
  }

  return state;
}
