import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { MangePlotShareComponent } from './plot-share/pages/mange-plot-share/mange-plot-share.component';
import { PlotListComponent } from './plot-share/component/plot-list/plot-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MangePlotShareComponent,
    PlotListComponent,
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule
  ]
})
export class ActivitiesModule { }
