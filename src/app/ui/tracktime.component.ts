import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Track} from '../store/model';

@Component({
  selector: 'app-track-time',
  templateUrl: './tracktime.component.html',
  styleUrls: ['./tracktime.component.scss']
})
export class AppTrackTimeComponent {

  @Input()
  track: Track;

}
