import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectToken } from '../../../core/app.selectors';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1), // Take the first emitted token value
      switchMap(token => {
        if (!token) {
          return next.handle(req); // Proceed without token if none exists
        }

        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {            
            return throwError(() => ({
              message: error.message,
              status: error.status,
              error: error.error
            }));
          })
        );
      })
    );
  }
}