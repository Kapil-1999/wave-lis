import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IMG_URL } from '../../../../../shared/constant/menu';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList: any;
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  searchKeyword: any;
  bsModalRef! : BsModalRef;
  imgeUrl = IMG_URL;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };

  constructor(
    private userService: UserService,
    private modalService : BsModalService
  ) { };

  ngOnInit(): void {
    this.setInitialTable();
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  };

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Name' },
      { key: '', title: 'Login Id' },
      { key: '', title: 'Email' },
      { key: '', title: 'Phone no.' },
      { key: '', title: 'Status' },
      { key: '', title: 'Address' },
      { key: '', title: 'Image' },
      { key: '', title: 'Action' }
    ]
  }

  getUserList(pagedata: any, tableSize: any, searchKeyword: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
      searchText: searchKeyword
    };
    this.userService.userList(page).subscribe((res: any) => {
      this.isLoading = false
      this.userList = res?.body?.data || [];
      this.pagesize.count = this.userList[0]?.total_count || 0
    })
  }


  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.pagesize.offset = 1;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)

  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.userList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)

  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)

  }

  onCreateUser(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateUserComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    });
  }
}
