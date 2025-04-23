import { Component } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateMenuComponent } from '../create-menu/create-menu.component';

@Component({
  selector: 'app-menu-list',
  standalone: false,
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  farmerData: any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Village`,
    searchPlaceholder: "Search Village"
  };
  columns: any;
  menuListData: any;

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  bsModalRef! : BsModalRef;
  
  constructor( 
    private menuService : MenuService,
    private modalService : BsModalService
   ){};

  ngOnInit(): void {
    this.setIntialTable()
    this.getMenuList(this.pagesize.offset, this.pagesize.limit)
  }

  setIntialTable() {
    this.columns = [
      {key : 'Sr No', title: 'Sr No'},
      {key : 'Module Name', title: 'Module Name'},
      {key : 'Menu Name', title: 'Menu Name'},
      {key : 'Order', title: 'Order'},
      {key : 'URL', title: 'URL'},
      {key : 'Icon', title: 'Icon'},
      {key : 'Status', title: 'Status'},
      {key : 'Action', title: 'Action'},
    ]
  }

  getMenuList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.menuService.menuList(page).subscribe((res:any) => {
      this.isLoading = false;
      this.menuListData = res?.body?.result;
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onCreateFarmer(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateMenuComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getMenuList(this.pagesize.offset, this.pagesize.limit)
    });
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getMenuList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getMenuList(this.pagesize.offset, this.pagesize.limit)
  }
}
