import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TracksStoreModule } from './store/store.module';

// import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from './router';
import { SWModule } from './sw';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // HttpModule,
    TracksStoreModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    PagesModule,
    RouterModule,
    SWModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
