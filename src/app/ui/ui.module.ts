
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { RouterModule } from '../router';

import { AppHeaderComponent } from './header.component';
import { FabComponent } from './fab.component';
import { AppAddTrackComponent } from './addtrack.component';
import { AppTrackTimeComponent } from './tracktime.component';
import { AppTrackCounterComponent } from './trackcounter.component';
import { AppTrackClockComponent } from './trackclock.component';
import { AppRecordButtonComponent } from './recordbtn.component';
import { TimeSincePipe } from './time.pipe';
import { SwiperRightDirective } from './swiper.directive';

const COMPONENTS = [
    AppHeaderComponent,
    FabComponent,
    AppAddTrackComponent,
    AppTrackCounterComponent,
    AppTrackTimeComponent,
    AppTrackClockComponent,
    AppRecordButtonComponent,
    TimeSincePipe,
    SwiperRightDirective,
  ];


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UIModule {}
