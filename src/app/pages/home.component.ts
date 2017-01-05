import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {State} from '../store/model';


@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  styles: ['']
})
export class PageHomeComponent implements OnInit {

  @Input() state: State;

  showAdd: false;

  constructor(public store: Store<State>) { }

  ngOnInit() {
    console.log(this.state);
  }

  addTrack(event) {
    this.store.dispatch({
      type: 'TRACK_ADD',
      payload: event
    });
    this.showAdd = false;
  }

  getTrack(trackId: string) {
    return this.state.tracksEntities[trackId];
  }

}
