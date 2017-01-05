import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
      <h1>Tracks</h1>
  `,
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  state = 'closed';

  ngOnInit() {

  }

}
