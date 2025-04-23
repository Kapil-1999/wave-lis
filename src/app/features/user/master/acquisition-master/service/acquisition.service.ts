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
    let url = API_CONSTANT.acquisitionList.replace('{pageNumber}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
      .replace('{khasraNo}', data.khasraNo)
      .replace('{farmerName}', data.farmerName);
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

  deleteAcquisition(data: any): Observable<any> {
    let url = API_CONSTANT.deleteAcquisition.replace('{id}', data?.acquisition_id).replace('{villageId}', data?.village_id)
    .replace('{khasraNo}', data?.khasra_no)
    return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}

