import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UIModule } from '../ui/ui.module';
import { PageHomeComponent } from './home.component';


@NgModule({
  imports: [
    CommonModule,
    UIModule
  ],
  declarations: [
    PageHomeComponent
  ],
  exports: [
    PageHomeComponent
  ]
})
export class PagesModule {}
