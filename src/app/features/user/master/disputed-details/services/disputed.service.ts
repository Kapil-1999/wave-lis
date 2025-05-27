import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisputedService {

  constructor(
    private apiService: ApiService
  ) { }

  disputeDetails(data: any): Observable<any> {
    let url = API_CONSTANT.disputeDetails.replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createDispute(data: any): Observable<any> {
    return this.apiService
      .post(API_CONSTANT.addDisputeDetails, data)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDisputeDetails(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDisputeDetails.replace('{id}', payload.disputed_id);
    return this.apiService.put(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }
}
