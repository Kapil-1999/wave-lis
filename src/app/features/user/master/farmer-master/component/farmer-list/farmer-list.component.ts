import { Component } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateFarmerComponent } from '../create-farmer/create-farmer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-farmer-list',
  standalone: false,
  templateUrl: './farmer-list.component.html',
  styleUrl: './farmer-list.component.scss'
})
export class FarmerListComponent {
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
  bsModalRef!: BsModalRef;
  searchKeyword: any;
  villageList: any;
  searchForm!: FormGroup

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private farmerService: FarmerService,
    private modalService: BsModalService,
    private commonService : CommonService,
    private fb: FormBuilder,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialValue();
    this.setInitialtable();
    this.getVillageList()
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
    })
    this.searchForm.get('village')?.valueChanges.subscribe((value) => {
      this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    })
  }


  setInitialtable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village Name' },
      { key: '', title: 'Farmer Name' },
      { key: '', title: 'Phone No.' },
      { key: '', title: 'Relation' },
      { key: '', title: 'Status' },
      { key: '', title: 'Address' },
      { key: '', title: 'Action' },
    ]
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.isLoading = false
      this.villageList = res?.body?.data || [];
    })
  }


  getFarmerList(offset: number, limit: number, searchKeyword: any) {
    this.isLoading = true;
    let data = {
      pageNo: offset,
      pageSize: limit,
      villageId: Array.isArray(this.searchForm.get('village')?.value) ? 0 : (this.searchForm.get('village')?.value?.value || 0),
      searchText: searchKeyword
    }
    this.farmerService.farmerList(data).subscribe((res: any) => {
      this.isLoading = false;
      this.farmerData = res?.body?.data || [];
      this.pagesize.count = this.farmerData[0]?.total_count || 0;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
  }

  onCreateFarmer(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateFarmerComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
    });
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchKeyword = searchValue;
    this.farmerData = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
  }

  onDeleteFarmer(item: any) {
    let url = this.farmerService.deleteFarmer(item?.farmer_id);
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
          this.notificationSerivce.successAlert(value?.body?.message);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onStatusActiveDeactive(item: any) {
    this.farmerService.activeDeactiveFarmer(item?.farmer_id).subscribe((res: any) => {
      if (res?.status == 200) {
        this.notificationSerivce.successAlert(res?.body?.message);
        this.pagesize.offset = 1;
        this.pagesize.limit = 25;
        this.getFarmerList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword)
      } else {
        this.notificationSerivce.errorAlert(res?.body?.message);
      };
    })
  }
}
