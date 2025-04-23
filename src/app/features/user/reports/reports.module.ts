import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ManagePlotReportComponent } from './plot-share-wise/pages/manage-plot-report/manage-plot-report.component';
import { PlotReportListComponent } from './plot-share-wise/component/plot-report-list/plot-report-list.component';
import { ManageFarmerReportComponent } from './farmer-wise/pages/manage-farmer-report/manage-farmer-report.component';
import { FarmerReportListComponent } from './farmer-wise/component/farmer-report-list/farmer-report-list.component';
import { ManageVillageReportComponent } from './village-wise-report/pages/manage-village-report/manage-village-report.component';
import { VillageReportListComponent } from './village-wise-report/component/village-report-list/village-report-list.component';
import { ManageAttrubutesReportsComponent } from './attributes-report/pages/manage-attrubutes-reports/manage-attrubutes-reports.component';
import { AttributesReportListComponent } from './attributes-report/component/attributes-report-list/attributes-report-list.component';


@NgModule({
  declarations: [
    ManageVillageReportComponent,
    VillageReportListComponent,
    ManagePlotReportComponent,
    PlotReportListComponent,
    ManageFarmerReportComponent,
    FarmerReportListComponent,
    ManageAttrubutesReportsComponent,
    AttributesReportListComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
