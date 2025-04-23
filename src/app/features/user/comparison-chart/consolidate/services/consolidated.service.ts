import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedService {

  constructor(
    private apiService : ApiService
  ) { }

  consolidatedList(data: any): Observable<any> {
    let url = API_CONSTANT.consolidatedList
      .replace('{villageId}', data.villageId)
      .replace('{khasraNo}', data.khasraNo)
      .replace('{pageNumber}', data.pageNumber || 1)
      .replace('{pageSize}', data.pageSize || 25);

    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
