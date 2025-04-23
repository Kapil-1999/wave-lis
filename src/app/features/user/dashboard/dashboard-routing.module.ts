import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangeDashboardComponent } from './pages/mange-dashboard/mange-dashboard.component';
import { AllReportsComponent } from './component/all-reports/all-reports.component';

const routes: Routes = [
  {
    path: 'home', component: MangeDashboardComponent , 
  },
  { path: 'home/reports', component: AllReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
