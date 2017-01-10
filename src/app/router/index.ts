import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


/*
A lifted Router module

*/
// => Observable of router states..

@Injectable()
export class RouterService {

  constructor(private location: Location) {
    console.log(location.path());
  }

  connect() {
    this.location.subscribe(e => {
      console.log('Location', e)
    })
  }

  go(path: string, query?: string) {
    this.location.go(path, query);
  }


}


@NgModule({
  imports: [CommonModule],
  providers: [
    RouterService,
    Location,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ]
})
export class RouterModule {}
