import { Component, HostListener } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { ADMIN_MENU } from '../../constant/menu';
import { SidebarLayoutType } from '../../types/layout.types';
import { CommonService } from '../../services/common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { selectToken, selectUser } from '../../../../core/app.selectors';
import { Observable } from 'rxjs';
import { clearAuth, setShowLogin } from '../../../../core/app.action';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuListData: any = ADMIN_MENU;
  userDetails: any;
  showMobileMenu: boolean = false;
  sidebarLayout: SidebarLayoutType | any = 'vertical';
  isSidebarOpen: boolean = false;
  token$: Observable<string>;
  user$: Observable<string>;
  tokenValue: any;
  user:any
  isLoading: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;    
  }
  changeSidebarLayout(layout: SidebarLayoutType): void {
    this.sidebarLayout = layout;
  }
  constructor(
    private router: Router,
    private commonService: CommonService,
    private store: Store<AppState>,
    private notificationService: NotificationService, 
  ) {
    this.token$ = this.store.select(selectToken);
    this.token$.subscribe(token => {
      this.tokenValue = token;
      this.getMenuList();

    });
    this.user$ = this.store.select(selectUser)  
    this.user$.subscribe(user => {
      this.user = user;
    }); 
  }
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(this.router.url);
      }
    }); 
  }

  getMenuList() {
    this.isLoading = true;
    this.commonService.menuSideList().subscribe((res: any) => {        
      this.isLoading = false;    
      this.menuListData = res?.body?.data || [];
      this.updateActiveMenu(this.router.url);
    });
  }

  updateActiveMenu(currentPath: string) {    
    this.menuListData?.forEach((menu: any) => {
      menu.isActive = menu.url === currentPath;
      let parts1 = menu.url.split('/');
      let parts2 = currentPath.split('/');
      if (parts1.length > 2 && parts2.length > 2) {
        if (parts1[2] === parts2[2]) {
          menu.isActive = true;
      } else {
          menu.isActive = false;
      }
      }      
      if (menu.menu_list) {
        menu.menu_list.forEach((subMenu: any) => {
          subMenu.isActive = subMenu.url === currentPath;
          if (subMenu.isActive) {
            menu.isActive = true;
          }
        });
      }
    });
  }


  @HostListener('document:click', ['$event'])
  closeMenus(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.closeAllMenus(this.menuListData);
      this.showPopup = false;
      this.showMobileMenu = false
    }
  }

  toggleDropdown(item: any, event: MouseEvent): void {
    this.closeAllMenus(this.menuListData, item);
    this.showPopup = false;
    if (item.menuList?.length > 0) {
      item.is_open = !item.is_open;
    }
  }


  private closeAllMenus(menuList: any[], exception?: any): void {
    menuList.forEach((menu: any) => {
      if (menu !== exception) {
        menu.is_open = false;
      }
      if (menu.menuList?.length) {
        this.closeAllMenus(menu.menuList, exception);
      }
      if (menu.childSubmenu?.length) {
        this.closeAllMenus(menu.childSubmenu, exception);
      }
    });
  }

  showPopup: boolean = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
    this.closeAllMenus(this.menuListData);
  }

  onShowMobileMewnu() {
    this.showMobileMenu = !this.showMobileMenu
  }

  goToProfile() {
    this.closeAllMenus(this.menuListData);
    this.showPopup = false;
    this.router.navigateByUrl('/admin/profile')
  }

  hideSidebar(event: any) {
    this.isSidebarOpen = event;
  }

  onShowLogin() {
    this.store.dispatch(setShowLogin({ showLogin: true } ));
  }

  logout() {
    this.router.navigateByUrl('/user/map/map-view');
    this.store.dispatch(clearAuth());
    this.notificationService.showSuccess('Logout Successfully');
  }


}
