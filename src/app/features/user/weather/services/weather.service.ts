import { Injectable } from '@angular/core';
import { ApiService } from '../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private apiService: ApiService
  ) { }

  getWeatherData(data: any): Observable<any> {
    let url = API_CONSTANT.weatherData.replace('{lat}', data.lat).replace('{lon}', data.lon).replace('{radius}', data.radius).replace('{fromDate}', data.fromDate).replace('{toDate}', data.toDate)
    return this.apiService.getWeather(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
