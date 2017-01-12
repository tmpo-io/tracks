import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './store/model';
import 'rxjs/add/operator/map';

import { Track } from './store/model';
import * as actions from './store/actions';
import { dataForTrack, getTimeToday } from './store/selectors';

import { RouterService } from './router';
import { SWService } from './sw';

declare var window: Window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tracks$: Observable<Track[]>;
  track$: Observable<Track>;
  sworker$: Observable<string>;

  path: string = '';

  constructor(public store: Store<any>,
    public router: RouterService,
    private worker: SWService) {

    store.dispatch({ type: actions.LOAD_STORE });
    // Handles connection logic for service worker..
    this.worker.connect();

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
        this.path = p;
      });

    this.track$ = this.store
      .select((state: any) => state.router)
      .switchMap(route => {
        let id = route.route.replace('/track/', '');
        return this.store
          .select((s: any) => s.data)
          .map(dataForTrack(id));

      });

    this.sworker$ = this.store
      .select(state => state.sw)
      .map(s => s.status);


  }

  reload() {
    window.location.reload();
  }

  // // RouteService.change.
  //     .subscribe(route => {

  //     })


}
