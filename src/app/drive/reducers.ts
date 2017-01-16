
import { Action } from '@ngrx/store';

import * as actions from './actions';

type AuthStateResult = 'pending' | 'success' | 'notlogged';

export class AppState {
  authState: AuthStateResult;
  logging: boolean;
}

const initial: AppState = {
  authState: 'pending',
  logging: false,
};


export function reducerGDrive(state = initial, action: Action): AppState {

  switch (action.type) {
    case actions.GAPI_AUTH_STATE: {
      return Object.assign({}, state, {
        authState: action.payload,
        logging: false
      });
    }
    case actions.GAPI_LOGIN: {
      return Object.assign({}, state, {
        logging: true
      });
    }
  }
  return state;
}
