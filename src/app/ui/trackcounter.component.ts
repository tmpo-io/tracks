import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Track } from '../store/model';
import * as actions from '../store/actions';


@Component({
  selector: 'app-track-counter',
  templateUrl: './trackcounter.component.html'
})
export class AppTrackCounterComponent {

  @Input()
  track: Track;

  constructor(public store: Store<any>) { }

  trackCounter() {
    this.store.dispatch(actions.trackCount(this.track.id));
  }


}
