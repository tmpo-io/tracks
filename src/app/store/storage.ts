import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { State, initialState } from './model';
import * as actions from './actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

const STORE_KEY = 'tracks';


export function get(key: any, defaultValue?: any) {
  if (typeof window === 'undefined') {
    return defaultValue;
  } else {
    let value = window.localStorage[key];
    return (typeof value !== 'undefined' ? value : defaultValue);
  }
}

export function set(key, value) {
  if (typeof window !== 'undefined') {
    window.localStorage[key] = value;
  }
}

export function loadStore(): State {
  let json = get(STORE_KEY);
  if (json) {
    return JSON.parse(json);
  }
  return initialState;
}


@Injectable()
export class Storage {

  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(
    actions.TRACK_ADD, actions.TRACK_START,
    actions.TRACK_COUNT, actions.TRACK_STOP,
    actions.TRACK_DELETE,
    )
    .switchMap(act => {
      return this.store
        .select(store => store.data)
        .map(d => {
          this.save(d as State);
          return Observable.of(1);
        }).take(1);
    });


  constructor(private actions$: Actions, private store: Store<any>) { }

  save(appState: State) {
    console.log('save');
    set(STORE_KEY, JSON.stringify(appState));
  }


}
