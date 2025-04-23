import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private apiService : ApiService
  ) { }

  menuList(data:any) :Observable<any> {
    let url = API_CONSTANT.menuList.replace('{pageNumber}', data.pageNo)
    .replace('{pageSize}', data.pageSize)
      return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
