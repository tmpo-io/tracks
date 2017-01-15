import { Injectable, NgModule } from '@angular/core';


function _window(): any {
  return window;
}


@Injectable()
export class WindowRef {

  get nativeWindow(): any {
    return _window();
  }

}



@NgModule({
  providers: [
    WindowRef
  ]
})
export class AppBrowserModule { }


