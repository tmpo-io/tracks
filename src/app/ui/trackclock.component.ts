import { Component, Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/timer';


const current = () => (new Date).getTime();

@Component({
  selector: 'app-track-clock',
  template: `<ng-content></ng-content>{{ (time$ | async) | timesince }}`
})
export class AppTrackClockComponent implements OnDestroy {

  time$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();

  @Input()
  time: number;

  @Input()
  last: number;

  @Input()
  set state(state: string) {
    if (state === 'stopped') {
      this.time$ =
        Observable.of(this.time)
          .takeUntil(this.destroy$);
      return;
    }
    this.time$ = Observable
      .timer(0, 1000)
      .startWith(1)
      .takeUntil(this.destroy$)
      .map(m => (this.time + (current() - this.last)));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }


}
