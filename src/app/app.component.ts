import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './store/model';
import 'rxjs/add/operator/map';

import { Track } from './store/model';
import * as actions from './store/actions';
import { getTimeToday } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tracks$: Observable<Track[]>;

  constructor(public store: Store<State>) {

    store.dispatch({type: actions.LOAD_STORE});

    this.tracks$ = store
      .select('data')
      .map((state: State) => state.tracks
        .map(id => state.tracksEntities[id])
        .map(obj => Object.assign({}, obj, {
          today: getTimeToday(state.logsEntities, obj)
        }))
        .reverse()
      );

  }

  // // RouteService.change
  //     .subscribe(route => {

  //     })


}
