import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageWeatherComponent } from './pages/manage-weather/manage-weather.component';

const routes: Routes = [
  {
    path: 'info',
    component: ManageWeatherComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
