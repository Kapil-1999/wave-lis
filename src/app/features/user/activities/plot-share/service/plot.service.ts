import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor(
    private apiService: ApiService
  ) { }

  

  plotShareDetails(data:any): Observable<any> {
    let url = API_CONSTANT.plotShareDetails.replace('{villageId}', data.villageId)
    .replace('{searchText}', data.searchText)
    .replace('{pageNumber}', data.pageNumber)
    .replace('{pageSize}', data.pageSize)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
