import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KhasraService } from '../../service/khasra.service';
import { CreateKhasraComponent } from '../create-khasra/create-khasra.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { VilageService } from '../../../village-master/service/vilage.service';

@Component({
  selector: 'app-khasra-list',
  standalone: false,
  templateUrl: './khasra-list.component.html',
  styleUrl: './khasra-list.component.scss'
})
export class KhasraListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Village`,
    searchPlaceholder: "Search Village"
  };
  villageList: any;
  khasraList: any;
  searchForm!: FormGroup;
  columns: any;
  bsModalRef!: BsModalRef
  searchKeyword: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private fb: FormBuilder,
    private khasraService: KhasraService,
    private bsmodalService: BsModalService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService,
    private villageService: CommonService
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.getVillageList()
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    this.setInitialTable();
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
    })
    this.searchForm.get('village')?.valueChanges.subscribe((value) => {      
      this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    })
  }

  setInitialTable() {
    this.columns = [
      { key: 'S.No', title: 'S.No' },
      { key: 'Village Name', title: 'Village Name' },
      { key: 'Village Code', title: 'Village Code' },
      { key: 'Khasra No', title: 'Khasra No' },
      {key: 'acquisition_area', title : 'Acquisition Area'},
      { key: 'Notified Area', title: 'Notified Area' },
      { key: 'Lmc Area', title: 'Lmc Area' },
      { key: 'Project Area', title: 'Project Area' },
      {key : 'total Area', title : 'Total Area'},
      { key: 'Registration Date', title: 'Registration Date' },
      { key: 'Status', title: 'Status' },
      { key: 'Action', title: 'Action' }
    ]
  }

  getVillageList() {
    this.villageService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }

  getKhasraList(pagedata: any, tableSize: any , searchKeyword: any) {
    this.isLoading = true;
    let data = {
      pageNumber: pagedata,
      pageSize: tableSize,
      villageId : Array.isArray(this.searchForm.get('village')?.value) ? 0 : (this.searchForm.get('village')?.value?.value || 0),
      searchText: searchKeyword
    }
    this.khasraService.khasraList(data).subscribe((res: any) => {
      this.isLoading = false;
      this.khasraList = res?.body?.data || [];
      this.pagesize.count = this.khasraList[0]?.total_count || 0;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
      this.pagesize.offset = 1;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)

  }

  onCreateKhasra(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.bsmodalService.show(
      CreateKhasraComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    });
  }

  onDeleteKhasra(item: any) {
    let url = this.khasraService.deleteKhasra(item?.khasra_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.khasra_no,
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
          this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.khasraList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onStatusActiveDeactive(item: any) {
    this.khasraService.activeDeactiveKhasra(item?.khasra_id).subscribe((res: any) => {      
      if (res?.status == 200) {
        this.notificationSerivce.successAlert(res?.body?.message);
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getKhasraList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
      } else {
        this.notificationSerivce.errorAlert(res?.body?.message);
      };
    })
  }
}
