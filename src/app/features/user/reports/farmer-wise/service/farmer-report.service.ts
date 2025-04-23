import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarmerReportService {

  constructor(
    private apiService: ApiService,
  ) { }

  farmerReport(data:any) : Observable<any> {
    let url = API_CONSTANT.farmerReport
      .replace('{userId}', data.userId)
      .replace('{reportType}', data.reportType)
      .replace('{villageId}', data.villageId)
      .replace('{farmerId}', data.farmerId)
      .replace('{pageNumber}', data.pageNumber)
      .replace('{pageSize}', data.pageSize);
    return this.apiService.get(url, data)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
