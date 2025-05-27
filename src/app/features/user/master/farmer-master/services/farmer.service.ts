import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { LocalStorageService } from '../../../../shared/services/localstorage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
  ) { }

  farmerList(data: any): Observable<any> {
    let url = API_CONSTANT.farmerList.replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addFarmer(data: any): Observable<any> {
    return this.apiService.post(API_CONSTANT.addFarmer, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateFarmer(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteFarmer.replace('{id}', payload.farmer_id);
    return this.apiService.put(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  deleteFarmer(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteFarmer.replace('{id}', id);
    return this.apiService.delete(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  activeDeactiveFarmer(id: any): Observable<any> {
    let url = API_CONSTANT.activeDeactiveFarmer
      .replace('{farmerId}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
