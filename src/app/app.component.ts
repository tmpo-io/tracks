import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './store/model';
import 'rxjs/add/operator/map';

import { Track } from './store/model';
import * as actions from './store/actions';
import { getTimeToday } from './store/reducers';
import { RouterService } from './router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tracks$: Observable<Track[]>;
  track$: Observable<Track>;

  path: string = '';

  constructor(public store: Store<State>,
    public router: RouterService) {

    store.dispatch({ type: actions.LOAD_STORE });

  }

  ngOnInit() {

    this.tracks$ = this.store
      .select('data')
      .map((state: State) => state.tracks
        .map(id => state.tracksEntities[id])
        .map(obj => Object.assign({}, obj, {
          today: getTimeToday(state.logsEntities, obj)
        }))
        .reverse()
      );

    this.store
      .select('router')
      .map((s: any) => s.route)
      .subscribe((p) => {
        console.log('path', p);
        this.path = p;
      });

    this.store
      .select((state: any) => ({
        router: state.router,
        tracks: state.data
      }))
      .subscribe(x => console.log(x));


  }


  // // RouteService.change
  //     .subscribe(route => {

  //     })


}
