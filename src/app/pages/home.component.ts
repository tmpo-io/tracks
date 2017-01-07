import {
  Component, Input, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../store/model';


@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent  {

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

  // byId(item) {
  //   return item.id;
  // }

}
