import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './store/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  state$: Observable<State>;


  constructor(public store: Store<State>) {

    this.state$ = store.select('data');

  }



}
