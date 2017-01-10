import { Component, Input } from '@angular/core';

import { Track } from '../store/model';

import { RouterService } from '../router';


@Component({
  selector: 'app-page-track',
  templateUrl: './track.component.html'
})
export class PageTrackComponent {
  @Input() track: Track;

  constructor(public router: RouterService) { }



}
