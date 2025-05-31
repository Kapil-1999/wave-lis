import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KhasraFarmerService {

  constructor(
    private apiService: ApiService
  ) { }

  khasraFarmerList(data: any): Observable<any> {
    let url = API_CONSTANT.khasraFarmerList
      .replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  addKhasraFarmer(payload:any) : Observable<any> {
    let url = API_CONSTANT.addKhasraFarmer
    return this.apiService.post(url , payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  updateKhasraFarmer(payload:any) : Observable<any> {
    let url = API_CONSTANT.updateKhasraFarmer.replace('{id}', payload?.mapping_id);
    return this.apiService.put(url, payload).pipe(catchError((error : HttpErrorResponse) => of(error)))
  }

  deleteKhasraFarmer(id:any) : Observable<any> {
    let url = API_CONSTANT.DeleteKhasraFarmer.replace('{id}', id);
    return this.apiService.delete(url).pipe(catchError((error : HttpErrorResponse) => of(error)))
  }

}
