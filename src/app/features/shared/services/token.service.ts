import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONSTANT } from '../constant/api.constant';
import { ApiService } from '../../http-service/api.service';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  //**generate token and redirect to dashboard page and after decode save token in indexdb */
  login(payload: any): Observable<any> {
    let url = API_CONSTANT.userLogin;
    return this.apiService
      .post(url, payload).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  goToDashboard() {
    this.router.navigate(['/admin/dashboard/home']);
  }

}
