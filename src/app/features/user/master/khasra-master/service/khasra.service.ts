import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KhasraService {

  constructor(
    private apiService: ApiService
  ) { }

  khasraList(data: any): Observable<any> {
    let url = API_CONSTANT.khasraList.replace('{pageNumber}', data.pageNumber)
      .replace('{pageSize}', data.pageSize)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addKhasra(data: any): Observable<any> {
    return this.apiService
     .post(API_CONSTANT.addKhasra, data)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateKhasra(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteKhasra.replace('{id}', payload.khasra_id);
    return this.apiService.put(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  deleteKhasra(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteKhasra.replace('{id}', id);
    return this.apiService.delete(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }
}
