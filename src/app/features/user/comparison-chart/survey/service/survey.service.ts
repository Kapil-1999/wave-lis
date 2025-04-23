import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-service/api.service';
import { catchError, Observable } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private apiService : ApiService
  ) { }

  surveyList(data:any) :Observable<any> {
    let url = API_CONSTANT.surveyList
    .replace('{villageId}', data.villageId || '')
    .replace('{khasraNo}', data.khasraNo || '')
    .replace('{pageNumber}', data.pageNo || 1)
    .replace('{pageSize}', data.pageSize || 25)
    return this.apiService.get(url).pipe((catchError((err) => {
      throw err;
    })));
  }
}
