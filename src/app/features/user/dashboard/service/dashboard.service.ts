import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/api.constant';
import { ApiService } from '../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apiService : ApiService
  ) { }

  summaryData(data:any): Observable<any> {
    let url = API_CONSTANT.summaryData
    .replace('{phaseNo}' , data.phaseNo)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
