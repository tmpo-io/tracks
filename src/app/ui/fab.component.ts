import { Component, Input,
  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fab',
  template: `<button
    [style.background-color]="background"
    [style.color]="color"
    (click)="click.next(true)">
    <ng-content></ng-content>
  </button>`,
  styleUrls: ['./fab.component.scss']
})
export class FabComponent {

  @Input() background: string = 'red';
  @Input() color: string = 'white';
  @Output() click: EventEmitter<boolean> = new EventEmitter();

}
