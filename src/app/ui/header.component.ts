import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
      <img src="assets/logo.svg" />
      <h1>Tracks</h1>
  `,
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {}
