import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {

  constructor(
    private apiService: ApiService
  ) { }

  acquisitionList(data: any): Observable<any> {
    let url = API_CONSTANT.acquisitionList
      .replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
      if(!data.khasraNo) {
        url = url.replace('&khasraNo={khasraNo}', '');
      } else {
        url = url.replace('{khasraNo}', data.khasraNo);
      }
      if (!data.searchText) {
        url = url.replace('&searchText={searchText}', '');
      } else {
        url = url.replace('{searchText}', data.searchText);
      }
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addAcquisition(payload: any): Observable<any> {
    let url = API_CONSTANT.addAcquisition
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateAcquisition(payload:any): Observable<any> {
    let url = API_CONSTANT.updateDeleteAcquisition.replace('{id}', payload?.acquisition_id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteAcquisition(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteAcquisition.replace('{id}', id)
    return this.apiService
     .delete(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  khasraDisputedArea(data:any) {
    let url = API_CONSTANT.khasraDisputedArea.replace('{villageId}', data?.villageId).replace('{khasraId}', data?.khasraId)
    return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));

  }
}

