import {
  Component, Output,
  EventEmitter, HostBinding,
  ViewChild, AfterViewInit
} from '@angular/core';

import { state, style, transition, animate, trigger } from '@angular/core';


@Component({
  selector: 'app-add-track',
  templateUrl: './addtrack.component.html',
  styleUrls: ['./addtrack.component.scss'],
  animations: [
    trigger('in', [
      state('*', style({
        transform: 'translate3d(0, 0, 0) rotateX(0deg)'
      })),
      state('void', style({
        transform: 'translate3d(0, -100px, -200px) rotateX(80deg)'
      })),
      transition('* <=> *', animate('300ms ease-out')),
    ])
  ]
})
export class AppAddTrackComponent implements AfterViewInit {

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() dismiss: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('form') form;

  @HostBinding('@in')
  in = 'in';

  kind = 'time';

  ngAfterViewInit() {
    setTimeout(() => {
      this.form.nativeElement.focus();
    }, 100);
  }

  submit() {
    let val = this.form.nativeElement.value;
    if (val.length < 3) {
      this.form.nativeElement.focus();
      return;
    }
    // console.log('event');
    this.add.next({
      desc: val,
      kind: this.kind
    });

  }

  key($event) {
    if ($event.keyCode === 13) {
      this.submit();
    }
  }

}
