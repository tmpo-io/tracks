import { Injectable, NgModule } from '@angular/core';

import { Observable } from 'rxjs/Observable';


function _window(): any {
  return window;
}


@Injectable()
export class WindowRef {

  constructor() { }

  get nativeWindow(): any {
    return _window();
  }


  loadScriptWithHandler(url, async): Observable<boolean> {
    return Observable.create((obs) => {
      // create a handler on window
      this.nativeWindow.handler = () => {
        obs.next();
        obs.complete();
      };

      const u = url + 'handler';
      let {head, script} = this.getDOMElementForScript(u, async);
      script.onload = () => {
        script.onerror = script.onload = null;
      };

      script.onerror = (e) => obs.error(e);
      head.appendChild(script);

      // @todo not sure if I should do this...
      return () => {
        head.removeChild(script);
      };

    });
  }

  loadScript(url, async = true): Observable<boolean> {

    return Observable.create((observer) => {
      const {head, script} = this.getDOMElementForScript(url, async);

      const onLoad = () => {
        script.onerror = script.onload = null;
        observer.next(true);
        observer.complete();
      };
      const onError = (e) => {
        script.onerror = script.onload = null;
        observer.error(e);
      };

      script.onload = onLoad;
      script.onerror = onError;
      head.appendChild(script);

      // @todo not sure if I should do this...
      return () => {
        head.removeChild(script);
      };

    });

  }

  getDOMElementForScript(url, async) {
    const document = this.nativeWindow.document as Document;
    const head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = async;
    script.src = url;
    return { head, script };
  }


}



@NgModule({
  providers: [
    WindowRef
  ]
})
export class AppBrowserModule { }


