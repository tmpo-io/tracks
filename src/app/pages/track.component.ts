import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { Track } from '../store/model';
import { RouterService } from '../router';
import * as actions from '../store/actions';

@Component({
  selector: 'app-page-track',
  templateUrl: './track.component.html',
})
export class PageTrackComponent {

  @Input() set track(track: Track) {
    this._track = track;
  }

  get track(): Track {
    return this._track;
  }

  private _track: Track;

  constructor(
    public router: RouterService,
    private store: Store<any>
    ) { }

  get table(): any {

    if (this._track.kind === 'time') {
      return this.timeTable();
    }
    return this.counterTable();
  }

  timeTable() {
    return this._track.logs
      .filter(t => t.action === 'stop')
      .map(t => ({
        started: t.time - t.amount,
        stopped: t.time,
        amount: t.amount,
        id: t.id
      }));
  }

  counterTable() {
    return this._track.logs
      .filter(t => t.action === 'track');
  }

  trackFunc(ind, obj) {
    return obj.id;
  }

  delete(id) {
    this.router.go('');
    this.store.dispatch(actions.trackDelete(id));
  }

}
