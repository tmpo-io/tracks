
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppHeaderComponent } from './header.component';
import { FabComponent } from './fab.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    AppHeaderComponent,
    FabComponent
  ],
  exports: [
    AppHeaderComponent,
    FabComponent
  ]
})
export class UIModule {}
