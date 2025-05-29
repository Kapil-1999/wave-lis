import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/api.constant';
import { ApiService } from '../../../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService : ApiService
  ) { }

  userList(data: any): Observable<any> {
    let url = API_CONSTANT.userList.replace('{pageNo}', data.pageNo)
      .replace('{pageSize}', data.pageSize)
    if (!data.searchText) {
      url = url.replace('&searchText={searchText}', '');
    } else {
      url = url.replace('{searchText}', data.searchText);
    }
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addUser(data: any): Observable<any> {
    return this.apiService.post(API_CONSTANT.addUser, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getUserById(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteUser.replace('{id}', id);
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  updateUser(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteUser.replace('{id}', payload.user_id);
    return this.apiService.put(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  deleteUser(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteUser.replace('{id}', id);
    return this.apiService.delete(url).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }

  activeDeactiveUser(id: any): Observable<any> {
    let url = API_CONSTANT.activeDeactiveUser
      .replace('{userId}', id)  
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
