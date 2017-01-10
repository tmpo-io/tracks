import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UIModule } from '../ui/ui.module';
import { PageHomeComponent } from './home.component';
import { PageTrackComponent } from './track.component';



@NgModule({
  imports: [
    CommonModule,
    UIModule,
  ],
  declarations: [
    PageHomeComponent,
    PageTrackComponent
  ],
  exports: [
    PageHomeComponent,
    PageTrackComponent
  ]
})
export class PagesModule {}
