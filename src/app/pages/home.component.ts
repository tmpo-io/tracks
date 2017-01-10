import {
  Component, Input, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RouterService } from '../router';

import { Track } from '../store/model';
import * as actions from '../store/actions';

declare var window: Window;

@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('in', [
      state('*', style({
        transform: 'scaleY(1)'
      })),
      state('void', style({
        transform: 'scaleY(0)'
      })),
      transition('* => void', animate('0.3s ease-out')),
    ])
  ]
})
export class PageHomeComponent {

  @Input() tracks: Track[] = [];

  showAdd: false;

  constructor(public store: Store<any>, public router: RouterService) {
  }

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

  goto() {
    console.log('goto');
    this.router.go('/track/1');
  }

}
