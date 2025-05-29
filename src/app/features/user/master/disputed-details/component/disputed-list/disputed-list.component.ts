import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DisputedService } from '../../services/disputed.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';
import { CrateDisputeComponent } from '../crate-dispute/crate-dispute.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-disputed-list',
  standalone: false,
  templateUrl: './disputed-list.component.html',
  styleUrl: './disputed-list.component.scss'
})
export class DisputedListComponent {
  [x: string]: any;
  disputeList: any;
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  searchKeyword: any;
  bsModalRef! : BsModalRef;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Village`,
    searchPlaceholder: "Search Village"
  };
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  };
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  };
  searchForm!: FormGroup;
  villageList :any;

  constructor(
    private disputeService: DisputedService,
    private fb: FormBuilder,
    private villageService: CommonService,
    private bsmodalService: BsModalService,
    private notificationService : NotificationService
  ) {}

  ngOnInit() {
    this.setInitialValue();
    this.setInitialTable();
    this.getVillageList();
    this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
    })
    this.searchForm.get('village')?.valueChanges.subscribe((value) => {
      this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    })
  }

  setInitialTable() {
    this.columns = [
      {key: '', title : 'S.No.'},
      {key: 'village_name', title : 'Village Name'},
      {key: '', title : 'Khasra No.'},
      {key: 'disputed_type', title : 'Disputed Type'},
      {key: 'court_case_no', title : 'Court Case No'},
      {key: 'disputed_area', title : 'Dispute Area'},
      {key: 'disputed_remarks', title : 'Dispute Remarks'},
      {key:'is_active', title : 'Status'},
      {key : 'action', title : 'Action'}
    ]
  }

  getVillageList() {
    this.villageService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }


  getDisputeList(pagedata: any, tableSize: any, searchKeyword: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
      searchText: searchKeyword,
      villageId :Array.isArray(this.searchForm.get('village')?.value) ? 0 : (this.searchForm.get('village')?.value?.value || 0),
    };
    this.disputeService.disputeDetails(page).subscribe((res: any) => {
      this.isLoading = false
      this.disputeList = res?.body?.data || [];
      this.pagesize.count = this.disputeList[0]?.total_count || 0;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.pagesize.offset = 1;
    this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.disputeList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }


  onCreateDispute(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.bsmodalService.show(
      CrateDisputeComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    });
  }

  onDeleteDispute(item: any) {
    let url = this.disputeService.deleteDisputeDetails(item?.disputed_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.disputed_remarks,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.bsmodalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.status == 200) {
          this.notificationService.successAlert(value?.body?.message);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
        } else {
          this.notificationService.errorAlert(value?.title);
        }
      }
    );
  }

  onStatusActiveDeactive(item: any) {
    this.disputeService.activeDeactiveDisputeDetails(item?.disputed_id).subscribe((res: any) => {      
      if (res?.status == 200) {
        this.notificationService.successAlert(res?.body?.message);
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getDisputeList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
      } else {
        this.notificationService.errorAlert(res?.body?.message);
      };
    })
  }
}
