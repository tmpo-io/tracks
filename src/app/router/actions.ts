
import { Action } from '@ngrx/store';

export const ROUTER_GOTO = 'ROUTER_GOTO';

export function goto(route = ''): Action {
  return {
    type: ROUTER_GOTO,
    payload: {
      route,
    }
  };
}


