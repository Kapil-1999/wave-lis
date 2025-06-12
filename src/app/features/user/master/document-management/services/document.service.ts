import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../../http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private apiService: ApiService
  ) { }

  documentList(data: any): Observable<any> {
    let url = API_CONSTANT.documentList
      .replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
      .replace('{villageId}', data.villageId)
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addKhasraDoc(data: any): Observable<any> {
    return this.apiService.post(API_CONSTANT.addKhasraDoc, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateKhasraDoc(payload:any): Observable<any> {
    let url = API_CONSTANT.updateKhasraDoc
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
