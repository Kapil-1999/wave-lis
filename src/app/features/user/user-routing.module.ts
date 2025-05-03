import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path :'overview', loadChildren : () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path :'map', loadChildren : () => import('./map/map.module').then(m => m.MapModule)
  },
  {
    path : 'activities', loadChildren : () => import("./activities/activities.module").then((m) => m.ActivitiesModule)
  },
  {
    path : 'master', loadChildren : () => import("./master/master.module").then((m) => m.MasterModule)
  },
  {
    path : 'report', loadChildren : () => import("./reports/reports.module").then((m) => m.ReportsModule)
  },
  {
    path : 'chart', loadChildren : () => import("./comparison-chart/comparison-chart.module").then((m) => m.ComparisonChartModule)
  },
  {
    path : 'help', loadChildren : () => import("./wave-help/wave-help.module").then((m) => m.WaveHelpModule)
  },
  {
    path : 'weather', loadChildren : () => import("./weather/weather.module").then((m) => m.WeatherModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
