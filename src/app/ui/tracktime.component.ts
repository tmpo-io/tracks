import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Track } from '../store/model';
import * as actions from '../store/actions';


@Component({
  selector: 'app-track-time',
  templateUrl: './tracktime.component.html',
})
export class AppTrackTimeComponent {

  @Input()
  track: Track;

  constructor(public store: Store<any>) { }

  trackTime(event) {
    if (event === 'stopped') {
      this.store.dispatch(actions.trackStop(this.track.id));
    } else {
      this.store.dispatch(actions.trackStart(this.track.id));
    }
    return false;
  }

}
