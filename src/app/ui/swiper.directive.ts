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
import 'rxjs/add/operator/takeWhile';


const coords = (ev: TouchEvent) => {
  return {
    x: ev.touches[0].clientX,
    y: ev.touches[0].clientY
  };
};

const treshold = (x: number, y: number) => (e: TouchEvent) => {
  return e.touches[0].clientX - x < 20 || x < 0;
};

const vtreshold = (y: number) => (e: TouchEvent) => {
  return Math.abs(e.touches[0].clientY - y) < 20;
};

const stream$ = (el, effect, destroy) => {
  const start$ = fromEvent(el, 'touchstart');
  const move$ = fromEvent(el, 'touchmove');
  const end$ = fromEvent(el, 'touchend');

  return start$
    .map(coords)
    .mergeMap(({x, y}) => move$
      .skipWhile(treshold(x, y))
      .takeWhile(vtreshold(y))
      .takeUntil(end$)
      .map((e: TouchEvent) => e.touches[0].clientX - x)
      .do(yy => effect(yy))
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
