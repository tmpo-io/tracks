import {
  Component, EventEmitter, Input, Output,
  NgModule
} from '@angular/core';

import {
  animate, state, style,
  transition, trigger, AnimationPlayer
} from '@angular/core';

import { CommonModule } from '@angular/common';

export interface ColorState {
  stopped: string;
  recording: string;
}


@Component({
  selector: 'app-record-button',
  template: `<div [@state]="state"
    [style.background-color]="color"
    (click)="setState()"></div>`,
  styles: [`
    :host {
      display: block;
    }
    div {
      width: 100%;
      height: 100%;
      transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  `],
  animations: [
    trigger('state', [
      state('recording', style({
        'border-radius': '0%',
        transform: 'scale(0.8, 0.8)'
      })),
      state('stopped', style({
        'border-radius': '50%',
        transform: 'scale(1, 1)'
      })),
      transition('recording <=> stopped', animate('0.8s cubic-bezier(0.25, 0.1, 0.25, 1)')),
    ])
  ]
})
export class AppRecordButtonComponent {

  @Output()
  click = new EventEmitter<string>();

  @Input()
  state: 'stopped' | 'recording' = 'stopped';

  @Input()
  colors: ColorState = { stopped: 'red', recording: 'black' };


  setState() {
    if (this.state === 'recording') {
      this.state = 'stopped';
    } else {
      this.state = 'recording';
    }

    this.click.next(this.state);
  }

  get color(): string {
    return this.colors[this.state];
  }


}
