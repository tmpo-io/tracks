
import { Action } from '@ngrx/store';


export const TRACK_ADD = 'TRACK_ADD';
export const TRACK_START = 'TRACK_START';
export const TRACK_STOP = 'TRACK_STOP';
export const TRACK_COUNT = 'TRACK_COUNT';
export const LOAD_STORE = 'LOAD_STORE';


export function addTrack(p: any): Action {
  return {
    type: TRACK_ADD,
    payload: p
  };
}

export function trackStart(id: string): Action {
  return {
    type: TRACK_START,
    payload: id
  };
}

export function trackStop(id: string): Action {
  return {
    type: TRACK_STOP,
    payload: id
  };
}


export function trackCount(id: string): Action {
  return {
    type: TRACK_COUNT,
    payload: id
  };
}

