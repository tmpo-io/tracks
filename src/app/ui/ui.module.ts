
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppHeaderComponent } from './header.component';
import { FabComponent } from './fab.component';
import { AppAddTrackComponent } from './addtrack.component';
import { AppTrackTimeComponent } from './tracktime.component';
import { TimeSincePipe } from './time.pipe';


const COMPONENTS = [
    AppHeaderComponent,
    FabComponent,
    AppAddTrackComponent,
    AppTrackTimeComponent,
    TimeSincePipe
  ];


@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UIModule {}
