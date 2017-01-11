import { Action } from '@ngrx/store';

import * as actions from './actions';

interface SwState {
  status: string;
}

const initial = {
  status: ''
};

export function swreducer(state = initial, action: Action): SwState {
  switch (action.type) {
    case actions.SW_STATUS:
      return Object.assign({}, state, {
        status: action.payload
      });
  }
  return state;
}
