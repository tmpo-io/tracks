import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


import { reducerTracks } from './reducers';


@NgModule({
  imports: [
    StoreModule.provideStore({
      data: reducerTracks
    })
  ]
})
export class TracksStoreModule {}
