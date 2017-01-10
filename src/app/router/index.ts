import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as actions from './actions';

/*
Lifted and ugly router module...
*/


@Injectable()
export class RouterService {

  constructor(
    private location: Location,
    public store: Store<any>) {
    // console.log(location.path());
    this.store.dispatch(actions.goto(location.path()));
    this.location.subscribe(e => {
      this.store.dispatch(actions.goto(e.url));
    });
  }


  go(path: string) {
    this.location.go(path);
    this.store.dispatch(actions.goto(path));
  }


}


@NgModule({
  imports: [CommonModule],
  providers: [
    RouterService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class RouterModule { }
