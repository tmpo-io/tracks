import {
  Component, Input, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../store/model';

declare var window: any;

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
    this.store.dispatch({
      type: 'TRACK_ADD',
      payload: event
    });
    this.showAdd = false;
  }

  byObj(item) {
    return item.id;
  }

  delete() {
    window.alert('delete');
  }

}
