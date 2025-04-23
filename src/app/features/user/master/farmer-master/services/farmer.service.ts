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

  farmerList(data:any) :Observable<any> {
    let url = API_CONSTANT.farmer.replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addFarmer(data:any) :Observable<any> {
    return this.apiService.post(API_CONSTANT.addFarmer, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
