import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TracksStoreModule } from './store/store.module';

import { UIModule } from './ui/ui.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    TracksStoreModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    UIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
