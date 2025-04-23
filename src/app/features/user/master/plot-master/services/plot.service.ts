import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor(
    private apiService: ApiService
  ) { }

  plotList(data:any) : Observable<any>{
    let url = API_CONSTANT.plotList.replace('{villageId}',data.villageId).replace('{khasraNo}',data.khasraNo).replace('{pageNumber}',data.pageNumber).replace('{pageSize}',data.pageSize);
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
