import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  constructor(
    private apiService : ApiService
  ) { }

  getDashboardTabReport(payload: any): Observable<any> {
    const url = API_CONSTANT.mapReports
    return this.apiService
      .getDataWithParam(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
