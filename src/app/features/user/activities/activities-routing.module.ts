import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangePlotShareComponent } from './plot-share/pages/mange-plot-share/mange-plot-share.component';

const routes: Routes = [
  {path : 'plot-share', component : MangePlotShareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
