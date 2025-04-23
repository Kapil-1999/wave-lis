import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-vertical-sidebar',
  standalone: false,
  templateUrl: './vertical-sidebar.component.html',
  styleUrl: './vertical-sidebar.component.scss'
})
export class VerticalSidebarComponent {
  @Input() menuListData: any[] = [];
  @Input() showProfile: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef) {}
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isOpen) {
      this.toggleSidebar.emit(false);
    }
  }

  ngOnInit(): void {
    this.closeAllMenus(this.menuListData);
  }

  toggleDropdown(menuItem: any): void {
    this.closeAllMenus(this.menuListData, menuItem);
    if (menuItem.menu_list?.length > 0) {
      menuItem.is_open = !menuItem.is_open;
    }
  }


  private closeAllMenus(menuList: any[], exception?: any): void {
    menuList.forEach((menu: any) => {
      if (menu !== exception) {
        menu.is_open = false;
      }
      if (menu.menu_list?.length) {
        this.closeAllMenus(menu.menu_list, exception);
      }
      if (menu.childSubmenu?.length) {
        this.closeAllMenus(menu.childSubmenu, exception);
      }
    });
  }
}
