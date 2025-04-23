import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../constant/api.constant';
import { ApiService } from '../../http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectUser } from '../../../core/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user$: Observable<any>;
  userData: any;

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>
  ) {    
    this.user$ = this.store.select(selectUser)  
    this.user$.subscribe(user => {
      this.userData = user
    }); 
  }

 getDept() {
  return this.userData?.department_id ?? '0';
}

getDesiId() {
  return this.userData?.designation_id ?? '0';
}

getUserId() {
  return this.userData?.user_id ?? '0';
}

getCompany(): Observable<any> {
  const deptId = this.getDept();
  const userId = this.getUserId();

  const url = API_CONSTANT.company.replace("{deptId}", deptId).replace("{userId}", userId);
  return this.apiService.get(url).pipe(
    catchError((error: HttpErrorResponse) => of(error))
  );
}

villageList(): Observable<any> {
  const deptId = this.getDept();
  const userId = this.getUserId();
  
  const url = API_CONSTANT.villageList.replace('{deptId}', deptId)
    .replace('{userId}', userId);
  return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

  khasraBasedOnVillage(data: any): Observable<any> {
    const deptId = this.getDept();
    const userId = this.getUserId();
    let url = API_CONSTANT.khasraBasedOnVillage.replace('{deptId}', deptId)
      .replace('{userId}', userId).replace("{villageId}", data.villageId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  commonFarmer(data: any): Observable<any> {
    const deptId = this.getDept();
    const userId = this.getUserId();
    let url = API_CONSTANT.commonFarmer.replace('{deptId}', deptId)
      .replace('{userId}', userId).replace("{villageId}", data.villageId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  menuSideList(): Observable<any> {    
    const url = API_CONSTANT.menuList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getLocalDateString(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
