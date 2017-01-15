import {
  NgModule, Injectable, ModuleWithProviders,
  OpaqueToken, Inject
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';


import * as actions from './actions';
import { WindowRef } from '../browser';

const GJS_CLIENT = 'https://apis.google.com/js/client.js?onload=';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export let CLIENT_ID = new OpaqueToken('sheets.config');

declare var gapi;


@Injectable()
export class GoogleSheet {

  constructor(
    @Inject(CLIENT_ID) private cid: string,
    private win: WindowRef,
    private store: Store<any>
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
    }, this.handleAuthResult.bind(this));
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



@NgModule({})
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
