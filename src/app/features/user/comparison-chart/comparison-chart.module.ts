import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparisonChartRoutingModule } from './comparison-chart-routing.module';
import { ManageConsolidatedComponent } from './consolidate/pages/manage-consolidated/manage-consolidated.component';
import { ConsolidatedListComponent } from './consolidate/component/consolidated-list/consolidated-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ManageSurveyComponent } from './survey/pages/manage-survey/manage-survey.component';
import { SurveyListComponent } from './survey/component/survey-list/survey-list.component';


@NgModule({
  declarations: [
    ManageConsolidatedComponent,
    ConsolidatedListComponent,
    ManageSurveyComponent,
    SurveyListComponent
  ],
  imports: [
    CommonModule,
    ComparisonChartRoutingModule,
    SharedModule
  ]
})
export class ComparisonChartModule { }
