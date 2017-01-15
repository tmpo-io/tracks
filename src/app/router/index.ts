import { ChangeDetectorRef, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as actions from './actions';

/*
Lifted and ugly router module...
*/

declare var Zone: any;

@Injectable()
export class RouterService {

  constructor(public location: Location,public store: Store<any>) {
    // Initialize store state
    this.store.dispatch(actions.goto(location.path()));
  }


  go(path: string) {
    this.location.go(path);
    this.store.dispatch(actions.goto(path));
  }


}
export const PROVIDERS = [
    RouterService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ];


@NgModule({
  imports: [CommonModule],
  providers: PROVIDERS
})
export class RouterModule {


}
