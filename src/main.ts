import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// declare var System: any;
// declare var hola: any;

// System.import('app/test.js').then((m) => {
//   m = require('app/test.js');
//  console.log(m);
//  hola();
// });


// declare var hola: any;



platformBrowserDynamic().bootstrapModule(AppModule);





