import './polyfills.aot';
// declare var ENV: string;
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';

// if ('production' === ENV) {
enableProdMode();
// }

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
}


export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
