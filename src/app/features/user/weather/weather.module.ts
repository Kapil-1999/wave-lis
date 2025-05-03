import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { ManageWeatherComponent } from './pages/manage-weather/manage-weather.component';
import { WeatherInfoComponent } from './component/weather-info/weather-info.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageWeatherComponent,
    WeatherInfoComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule
  ]
})
export class WeatherModule { }
