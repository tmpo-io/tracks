import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from './store/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';

  constructor(public store: Store<State>) { }


}
