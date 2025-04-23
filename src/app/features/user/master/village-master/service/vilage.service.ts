import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VilageService {

  constructor(
    private apiService: ApiService
  ) { }

  villageData(data: any): Observable<any> {
    let url = API_CONSTANT.villageData
      .replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize);
    
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }    
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addVillage(payload:any): Observable<any> {
    let url = API_CONSTANT.addVillage;
    return this.apiService.post(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  getVilageById(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeletegetVillage.replace('{id}', id);
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  deleteVillage(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeletegetVillage.replace('{id}', id);
    return this.apiService.delete(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  updateVillage(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDeletegetVillage.replace('{id}', payload.village_id);
    return this.apiService.put(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  activeDeactiveVillage(id: any): Observable<any> {
    let url = API_CONSTANT.activeDeactiveVillage
      .replace('{villageId}', id)  
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
