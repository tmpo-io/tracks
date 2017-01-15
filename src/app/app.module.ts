import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TracksStoreModule } from './store/store.module';

// import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from './router';
import { SWModule } from './sw';
import { AppBrowserModule } from './browser';
import { DriveModule } from './drive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppBrowserModule,
    TracksStoreModule,
    DriveModule.forRoot('784309713365-ho3koq0d7e0pr32jbs162o9bi19q01n6.apps.googleusercontent.com'),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    PagesModule,
    RouterModule,
    SWModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
