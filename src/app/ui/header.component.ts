import { Component, Input } from '@angular/core';

import { RouterService } from '../router';

@Component({
  selector: 'app-header',
  template: `
      <h1>Tracks</h1>
      <div class="back" *ngIf="back" (click)="click()">
        <img src="assets/arrow.svg" alt="Left arrow" />
      </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {

  @Input() back = false;

  constructor(private router: RouterService) { }

  click() {
    this.router.go('');
  }

}
