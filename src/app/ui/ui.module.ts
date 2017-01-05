
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppHeaderComponent } from './header.component';
import { FabComponent } from './fab.component';
import { AppAddTrackComponent } from './addtrack.component';

const COMPONENTS = [
    AppHeaderComponent,
    FabComponent,
    AppAddTrackComponent
  ];


@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UIModule {}
