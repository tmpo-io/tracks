import { Action } from '@ngrx/store';

import * as actions from './actions';

export interface RouteState {
  route: string;
}


export const initial: RouteState = {
  route: ''
};

export function reducer(state: RouteState = initial, action: Action) {
  switch (action.type) {
    case actions.ROUTER_GOTO: {
      return Object.assign({}, state, action.payload);
    }
  }
  return state;
}
