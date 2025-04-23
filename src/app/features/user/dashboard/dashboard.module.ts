import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangeDashboardComponent } from './pages/mange-dashboard/mange-dashboard.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PhaseComponent } from './component/phase/phase.component';
import { AllReportsComponent } from './component/all-reports/all-reports.component';

@NgModule({
  declarations: [
    MangeDashboardComponent,
    DashboardComponent,
    PhaseComponent,
    AllReportsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
