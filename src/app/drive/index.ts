import {
  NgModule, Injectable, ModuleWithProviders,
  OpaqueToken, Inject, NgZone
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import { Effect, EffectsModule, Actions } from '@ngrx/effects';

import * as actions from './actions';
import { WindowRef } from '../browser';

const GJS_CLIENT = 'https://apis.google.com/js/client.js?onload=';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export let CLIENT_ID = new OpaqueToken('sheets.config');

declare var gapi;


const authObservable = (clientId, zone: NgZone) => (a) => {
  return Observable.create((obs) => {
    let result = (r) => {
      // we need to add zone because is an external
      // async action outside zone
      zone.run(() => {
        obs.next(r);
        obs.complete();
      });
    };
    gapi.auth.authorize({
      client_id: clientId,
      scope: SCOPES,
      immediate: false
    }, result
    );

  });
};


@Injectable()
export class GoogleSheet {

  @Effect()
  handleAuth$() {
    return this.act$
      .ofType(actions.GAPI_LOGIN)
      .switchMap(authObservable(this.cid, this.zone))
      .map((result: any) => {
        if (result && !result.error) {
          return actions.gapiAuthSuccess('success');
        }
        return actions.gapiAuthSuccess('notlogged');
      });
  }


  constructor(
    @Inject(CLIENT_ID) private cid: string,
    private win: WindowRef,
    private store: Store<any>,
    private act$: Actions,
    private zone: NgZone
  ) {
    this.win
      .loadScriptWithHandler(GJS_CLIENT, false)
      .subscribe(() => {
        this.checkAuth();
      });
  }

  checkAuth() {
    gapi.auth.authorize({
      'client_id': this.cid,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, (r) => {
      this.handleAuthResult(r);
    });
  }

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      this.store.dispatch(actions.gapiAuthSuccess('success'));
      // console.log('gdrive auth succcess');
    } else {
      this.store.dispatch(actions.gapiAuthSuccess('notlogged'));
      // console.log('auth error: ', authResult);
    }
  }



}



@NgModule({
  imports: [
    EffectsModule.run(GoogleSheet)
  ],
})
export class DriveModule {
  static forRoot(clientId): ModuleWithProviders {
    return {
      ngModule: DriveModule,
      providers: [
        GoogleSheet,
        { provide: CLIENT_ID, useValue: clientId }
      ],
    };
  }
}
