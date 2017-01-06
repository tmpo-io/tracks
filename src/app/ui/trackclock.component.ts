import { Component, Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-track-clock',
  template: `{{ (time$ | async) | timesince }}`
})
export class AppTrackClockComponent implements OnDestroy {

  time$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();

  @Input()
  time: number;

  @Input()
  set state(state: string) {
    if (state === 'stopped') {
      this.time$ =
        Observable.of(this.time)
        .takeUntil(this.destroy$);
      return;
    }
    this.time$ = Observable
      .interval(1000)
      .takeUntil(this.destroy$)
      .map(m => this.time + (m * 1000));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }


}
