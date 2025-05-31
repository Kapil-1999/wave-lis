import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcquisitionService } from '../../service/acquisition.service';
import { CreateAcquisitionComponent } from '../create-acquisition/create-acquisition.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-acquisition-list',
  standalone: false,
  templateUrl: './acquisition-list.component.html',
  styleUrl: './acquisition-list.component.scss'
})
export class AcquisitionListComponent {
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
    placeholder: `Select Vilage`,
    searchPlaceholder: "Search Village"
  };

  config1 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Khasra No.`,
    searchPlaceholder: "Search Khasra No."
  };

  config2 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Farmer`,
    searchPlaceholder: "Search Farmer"
  };

  columns: any;
  acquisitionList: any;
  villageList: any;
  searchForm!: FormGroup
  khasraList: any;
  bsModalRef!: BsModalRef;
  bsModelRef: any;
  farmerList: any;
  searchKeyword: any;

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private acquisitionService: AcquisitionService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.getVillageList();
    this.setInitialTable()
    this.setInitialValue();
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value)
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village' },
      { key: '', title: 'Khasra No.' },
      { key: '', title: 'Farmer' },
      { key: '', title: 'Party' },
      { key: '', title: 'Purchase Farmer Name' },
      { key: '', title: 'Acquisition Date' },
      { key: '', title: 'Acquisition Area' },
      { key: '', title: 'Purchase Registery' },
      { key: '', title: 'Balance Registery' },
      { key: '', title: 'Purchase Karar' },
      { key: '', title: 'Balance Karar' },
      { key: '', title: 'Abadi Alloted' },
      { key: '', title: 'LMC Leased' },
      { key: '', title: 'Transfer Suncity Uchd' },
      { key: '', title: 'Court Area' },
      { key: '', title: 'Dispute Area' },
      { key: '', title: 'Case Remark' },
      { key: '', title: 'Action' }
    ]
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
      khasra: [null],
      searchKeyword: ['']
    })
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.khasraList = [];
      this.acquisitionList = [];
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
    } else {
      this.khasraList = [];
      this.acquisitionList = [];
      this.searchForm.get('khasra')?.setValue(null);
    }
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value)
  }

  getKhasraBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {
      this.khasraList = res?.body?.data || [];
    })
  }

  onChangeKhasra(event: any) {
    if (!Array.isArray(event?.value)) {
      this.acquisitionList = [];
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
    } else {
      this.acquisitionList = [];
      return
    }
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data;
    } else {
      return '';
    }
  }


  getAcqusitionList(pagedata: any, tableSize: any, searchKeyword: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue.value : 0,
      khasraNo: khasraValue ? khasraValue?.text?.split(' ')[0] : '',
      searchText: searchKeyword
    }
    this.acquisitionService.acquisitionList(data).subscribe((res: any) => {
      this.isLoading = false
      this.acquisitionList = res?.body?.data || [];
      this.pagesize.count = this.acquisitionList[0]?.total_count || 0;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);

  }

  onCreateAcquisition(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateAcquisitionComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
    });
  }


  onAcquisitionDelete(item: any) {
    let url = this.acquisitionService.deleteAcquisition(item?.acquisition_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.purchase_farmer_name,
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
          this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value)
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        };
      }
    );
  };

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchForm.get('searchKeyword')?.patchValue(searchValue);
    this.acquisitionList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  clearSearch() {
    this.searchForm.get('searchKeyword')?.patchValue('');
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }
}
