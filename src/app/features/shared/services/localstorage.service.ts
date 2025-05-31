import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectToken } from '../../../core/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private store : Store<AppState>
  ) { }
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  //**setitem in localstorage */
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  //**getitem from localstorage */
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  //**remove item from lovalstorage */
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  getCurrentTab(tab:any) {
    let newTab = tab.split('_')
    return newTab[1];    
  }

  //**clear localstorage */
  // clear(): void {
  //   this.cookieService.delete('token', '/'); 
  //   localStorage.removeItem('menu');
  //   localStorage.removeItem('user')
  // }

  clear(): void {
    let currentTabId = localStorage.getItem('current-tab');
    if (currentTabId) {
      localStorage.removeItem(`menu-login-${currentTabId}`);
      localStorage.removeItem(`user-login-${currentTabId}`);
      localStorage.removeItem(`tab-id-${currentTabId}`);
      localStorage.setItem('logout-event', currentTabId + '-' + new Date().getTime());  
      localStorage.removeItem('current-tab');
    }
  }

  // getToken(): string | null {
  //   return this.getItem('pwdtoken'); 
  // }

  // isLoggedIn() {
  //   return token !== null;
  // }

  getToken(): string | null {
    let tokenValue: string | null = null;
    this.store.select(selectToken).subscribe(token => {
      tokenValue = token;
    });
    return tokenValue;
  }
}