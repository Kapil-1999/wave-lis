import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { KhasraFarmerService } from '../../service/khasra-farmer.service';
import { CreateKhasraFarmerComponent } from '../create-khasra-farmer/create-khasra-farmer.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-khasra-farmer-list',
  standalone: false,
  templateUrl: './khasra-farmer-list.component.html',
  styleUrl: './khasra-farmer-list.component.scss'
})
export class KhasraFarmerListComponent {
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
    private commonSerivce: CommonService,
    private notificationSerivcev: NotificationService,
    private khasraFarmerService: KhasraFarmerService,
    private modalService: BsModalService
  ) { };

  ngOnInit() {
    this.setInitialValue();
    this.setInitialTable();
    this.getVillageList();
    this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village' },
      { key: '', title: 'Khasra' },
      { key: '', title: 'Farmer Name' },
      { key: '', title: 'Action' }

    ]
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
    })
    this.searchForm.get('village')?.valueChanges.subscribe((value) => {
      this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    })
  }

  getVillageList() {
    this.commonSerivce.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }

  getKhasraFarmerList(pageNo: any, pageSize: any, searchKeyword: any) {
    this.isLoading = true;
    let payload = {
      pageNo: pageNo,
      pageSize: pageSize,
      villageId: Array.isArray(this.searchForm.get('village')?.value) ? 0 : (this.searchForm.get('village')?.value?.value || 0),
      searchText: searchKeyword
    }
    this.khasraFarmerService.khasraFarmerList(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.khasraList = res?.body?.data || [];
      this.pagesize.count = this.khasraList[0]?.total_count || 0;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.pagesize.offset = 1;
    this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.khasraList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onCreateKhasraFarmer(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateKhasraFarmerComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
    });
  }

  onKhasraFarmerDelete(item: any) {
    let url = this.khasraFarmerService.deleteKhasraFarmer(item?.mapping_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.farmer_name,
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
          this.notificationSerivcev.successAlert(value?.body?.message);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getKhasraFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
        } else {
          this.notificationSerivcev.errorAlert(value?.title);
        };
      }
    );
  };

}
