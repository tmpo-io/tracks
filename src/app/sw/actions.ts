
import { Action } from '@ngrx/store';


export const SW_STATUS = 'SW_STATUS';

export function swStatus(msg: string): Action {
  return {
    type: SW_STATUS,
    payload: msg
  };
}


