
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppHeaderComponent } from './header.component';
import { FabComponent } from './fab.component';
import { AppAddTrackComponent } from './addtrack.component';
import { AppTrackTimeComponent } from './tracktime.component';
import { AppTrackClockComponent } from './trackclock.component';
import { AppRecordButtonComponent } from './recordbtn.component';
import { TimeSincePipe } from './time.pipe';


const COMPONENTS = [
    AppHeaderComponent,
    FabComponent,
    AppAddTrackComponent,
    AppTrackTimeComponent,
    AppTrackClockComponent,
    AppRecordButtonComponent,
    TimeSincePipe,
  ];


@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UIModule {}
