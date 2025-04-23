import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageConsolidatedComponent } from './consolidate/pages/manage-consolidated/manage-consolidated.component';
import { ManageSurveyComponent } from './survey/pages/manage-survey/manage-survey.component';

const routes: Routes = [
  {
    path : 'consolidated',component : ManageConsolidatedComponent
  },
  {
    path : 'survey',component : ManageSurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparisonChartRoutingModule { }
