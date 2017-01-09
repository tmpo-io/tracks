import {
  Directive, Output,
  HostListener, OnInit, OnDestroy,
  ElementRef, Renderer, NgZone, EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/takeLast';


const filter = (first) => current => current > first + 5;

const onSwipe = (ini: any) => (e: TouchEvent) => {
  let x = e.touches[0].clientX - ini;
  let success = (x > 100) ? true : false;
  let direction = (x > 0) ? 'right' : 'left';
  return { x, success };
};

const treshold = (x: number) => (e: TouchEvent) => {
  return e.touches[0].clientX - x < 20 || x < 0;
};


const stream$ = (el, effect, destroy) => {
  const start$ = fromEvent(el, 'touchstart');
  const move$ = fromEvent(el, 'touchmove');
  const end$ = fromEvent(el, 'touchend');

  return start$
    .map((ev: any) => ev.touches[0].clientX)
    .mergeMap(x => move$
      // .startWith({touches: [{clientX: 0}]})
      .skipWhile(treshold(x))
      .takeUntil(end$)
      .map((e: TouchEvent) => e.touches[0].clientX - x)
      .do(y => effect(y))
      .takeLast(1)
    );
};



@Directive({
  selector: '[appSwiperRight]'
})
export class SwiperRightDirective implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  move$: Observable<number>;

  @Output()
  appSwiperRight = new EventEmitter<boolean>();

  constructor(private ref: ElementRef,
    private render: Renderer,
    private zone: NgZone) { }

  ngOnInit() {

    let { width } = this.element.getBoundingClientRect();

    const move = (x) => {
      this.left = x + 'px';
    };
    this.zone.runOutsideAngular(() => {
      this.move$ = stream$(this.element, move, this.destroy$);
    });
    this.move$.subscribe(this.zone.run(() => x => {
        if (x > (width / 2)) {
          this.left = '100%';
          this.appSwiperRight.next(true);
        } else {
          this.left = '0px';
        }
      })
      );
  }

  set left(x: string) {
    this.render.setElementStyle(this.element, 'left', x);
  }

  get element(): HTMLElement {
    return this.ref.nativeElement;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}
