import {
  Component, Input, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../store/model';
import * as actions from '../store/actions';

declare var window: Window;

@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent {

  @Input() tracks: Track[] = [];

  showAdd: false;

  constructor(public store: Store<any>) { }

  addTrack(event) {
    this.store.dispatch(actions.addTrack(event));
    this.showAdd = false;
    window.scrollTo(0, 0);
  }

  byObj(index, item) {
    return item.id;
  }

  delete(track: string) {
    this.store.dispatch(actions.trackDelete(track));
  }

}
