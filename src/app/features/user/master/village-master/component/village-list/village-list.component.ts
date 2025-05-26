import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../../shared/services/localstorage.service';
import { VilageService } from '../../service/vilage.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateVillageComponent } from '../create-village/create-village.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-village-list',
  standalone: false,
  templateUrl: './village-list.component.html',
  styleUrl: './village-list.component.scss'
})
export class VillageListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  searchKeyword: any = '';
  villageData: any
  public columns!: any;
  bsModalRef!: BsModalRef;


  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private villageService: VilageService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.setInitalTable();
    this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  setInitalTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village Code' },
      { key: '', title: 'Village Name' },
      { key: '', title: 'Shape Area' },
      { key: '', title: 'Phase' },
      { key: '', title: 'Status' },
      { key: '', title: 'Action' }
    ]
  }

  fetchVillageList(pagedata: any, tableSize: any, searchKeyword: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
      searchText: searchKeyword
    };
    this.villageService.villageData(page).subscribe((res: any) => {
      this.isLoading = false
      this.villageData = res?.body?.data || [];
      this.pagesize.count = this.villageData[0]?.total_count || 0
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)

  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onCreateVillage(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateVillageComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    });
  }

  onDeleteVillage(item: any) {
    let url = this.villageService.deleteVillage(item?.village_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.village_name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.status == 200) {
          this.notificationSerivce.successAlert(value?.body?.message);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
        } else {
          this.notificationSerivce.errorAlert(value?.body?.message);
        }
      }
    );
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.villageData = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onStatusActiveDeactive(item: any) {
    this.villageService.activeDeactiveVillage(item?.village_id).subscribe((res: any) => {
      let message = `Village ${item?.is_active == 1 ? 'Deactivated' : 'Activated'} successfully`
      this.notificationSerivce.successAlert(message);
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.fetchVillageList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    })
  }
}
