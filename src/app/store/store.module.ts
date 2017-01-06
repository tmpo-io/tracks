import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerTracks } from './reducers';

import { Storage } from './storage';


@NgModule({
  imports: [
    StoreModule.provideStore({
      data: reducerTracks
    }),
    EffectsModule.run(Storage)
  ]
})
export class TracksStoreModule {}
