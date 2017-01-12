import { Injectable, NgModule } from '@angular/core';


import { Store } from '@ngrx/store';
import * as actions from './actions';
import { environment } from '../../environments/environment';


declare var window;

@Injectable()
export class SWService {

  constructor(private store: Store<any>) {}

  connect() {
    console.log('booting version', environment.version);
    // @todo SSR valid code...
    window.sworker
      .then((r) => this.resolve(r))
      .catch((e) => {
        console.error('Error during service worker registration:', e);
      });
  }

  resolve(reg) {
    console.log('called from service worker', this, reg);
    reg.onupdatefound = () => {
      let installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        console.log('this get called?');
        this.store.dispatch(actions.swStatus(installingWorker.state));
      };
    };
  }

}


@NgModule({
  providers: [SWService]
})
export class SWModule {}
