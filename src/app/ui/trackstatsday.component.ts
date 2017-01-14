import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-track-stats',
  templateUrl: './trackstatsday.component.html'
})
export class AppTrackStatsDayComponent {

  max: number = 0;
  private list: any[];

  @Input()
  track;

  @Input() set stats(d) {
    this.list = d.reverse();
    this.max = d.reduce((a, b) => a + b.value, 0);
  }

  get stats() {
    return this.list;
  }

  constructor(public sanitizer: DomSanitizer) {}

}
