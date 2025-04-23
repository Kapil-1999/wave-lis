import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVillageReportComponent } from './village-wise-report/pages/manage-village-report/manage-village-report.component';
import { ManagePlotReportComponent } from './plot-share-wise/pages/manage-plot-report/manage-plot-report.component';
import { ManageFarmerReportComponent } from './farmer-wise/pages/manage-farmer-report/manage-farmer-report.component';
import { ManageAttrubutesReportsComponent } from './attributes-report/pages/manage-attrubutes-reports/manage-attrubutes-reports.component';

const routes: Routes = [
  {
    path : 'village-wise-report',component : ManageVillageReportComponent
  },
  {
    path : 'plot-wise-report',component : ManagePlotReportComponent
  },
  {
    path : 'farmer-wise-report',component : ManageFarmerReportComponent
  },
  {
    path : 'attributs-report', component : ManageAttrubutesReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
