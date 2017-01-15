import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


import { State, Track } from './store/model';
import * as actions from './store/actions';
import * as ractions from './router/actions';
import { dataForTrack, getTimeToday } from './store/selectors';
import { RouterService } from './router';
import { SWService } from './sw';
import { WindowRef } from './browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('in', [
      state('*', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('void', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('* => void', animate('0.3s ease-out')),
      transition('void => *', animate('0.3s ease-out')),
    ]),
    trigger('in2', [
      state('*', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('void', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('* => void', animate('0.3s ease-out')),
      transition('void => *', animate('0.3s ease-out')),
    ])
  ]
})
export class AppComponent implements OnInit {

  tracks$: Observable<Track[]>;
  track$: Observable<Track>;
  sworker$: Observable<string>;

  path: string = '';

  constructor(public store: Store<any>,
    public router: RouterService,
    private worker: SWService,
    private cd: ChangeDetectorRef,
    private window: WindowRef) {

    store.dispatch({ type: actions.LOAD_STORE });
    // Handles connection logic for service worker..
    this.worker.connect();
  }

  ngOnInit() {

    // handle route events
    this.router.location.subscribe(e => {
      this.store.dispatch(ractions.goto(e.url));
      this.cd.markForCheck();
    });


    this.tracks$ = this.store
      .select('data')
      .map((state: State) => state.tracks
        .map(id => state.tracksEntities[id])
        .map(obj => Object.assign({}, obj, {
          today: getTimeToday(state.logsEntities, obj)
        }))
        // .sort((a, b) => a.lastRecord - b.lastRecord)
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
      .map(route => route.route.replace('/track/', ''))
      .filter(id => id !== '')
      .switchMap(id => this.store
            .select((s: any) => s.data)
            .map(dataForTrack(id))
      );

    this.sworker$ = this.store
      .select(state => state.sw)
      .map(s => s.status);


  }

  reload() {
    this.window.nativeWindow.location.reload();
  }

  // // RouteService.change.
  //     .subscribe(route => {

  //     })


}
