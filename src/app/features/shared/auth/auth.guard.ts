import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/app.reducer';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  
  constructor(
    private authService: LocalStorageService, 
    private router: Router, 
    private store: Store<AppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.getToken()) {
      return true; 
    } else {
      this.router.navigate(['/user/map/map-view']);
      return false; 
    }
  }
}

