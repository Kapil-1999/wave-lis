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
    private modalService : BsModalService,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.getVillageList();
    this.setInitialTable()
    this.setInitialValue()
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Acquisition' },
      { key: '', title: 'Village' },
      { key: '', title: 'Farmer Id' },
      { key: '', title: 'Farmer' },
      { key: '', title: 'Khasra No.' },
      { key: '', title: 'Acquisition Date' },
      { key: '', title: 'Party' },
      { key: '', title: 'Purchase Karar' },
      { key: '', title: 'Balance Karar' },
      { key: '', title: 'Balance Registery' },
      { key: '', title: 'Purchase Registery' },
      { key: '', title: 'Purchase Farmer Name' },
      { key: '', title: 'Transfer Suncity Uchd' },
      { key: '', title: 'Left Abadi' },
      { key: '', title: 'Court Area' },
      { key: '', title: 'Dispute Area' },
      { key: '', title: 'Case Remark' },
      { key: '', title: 'IMC Resume' },
      { key: '', title: 'Plot Share' },
      { key: '', title: 'IMC Leased' },
      { key: '', title: 'Abadi Alloted' },
      { key: '', title: 'Action' }
    ]
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null,[Validators.required]],
      khasra: [null,[Validators.required]],
      farmer: [null,[Validators.required]]
    })
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
      if (this.villageList && this.villageList?.length > 0) {
        this.searchForm.get('village')?.setValue(this.villageList[0]);
        this.getKhasraBasedOnVillage((this.villageList[0].value));
        this.getFarmerBasedOnVillage((this.villageList[0].value));
      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.searchForm.get('farmer')?.setValue(null);  
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getFarmerBasedOnVillage(event.value?.value);
    } else {
      this.khasraList = [];
      this.farmerList = [];
      this.acquisitionList = [];
      this.searchForm.get('khasra')?.setValue(null);
      this.searchForm.get('farmer')?.setValue(null);
      return
    }
  }

  getKhasraBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {
      this.khasraList = res?.body?.result || [];
      if (this.khasraList && this.khasraList?.length > 0) {
        this.searchForm.get('khasra')?.setValue(this.khasraList[0]);
        this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
      }
    })
  }

  onChangeKhasra(event:any) {
    if (!Array.isArray(event?.value)) {
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.acquisitionList = [];
      this.searchForm.get('khasra')?.setValue(null);
      return
    }
  }


  getFarmerBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.commonFarmer(data).subscribe((res: any) => {
      this.farmerList = res?.body?.result || [];

      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
    })
  }

  onChangeFarmer(event:any) {
    if (!Array.isArray(event?.value)) {
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.acquisitionList = [];
      this.searchForm.get('farmer')?.setValue(null);
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


  getAcqusitionList(pagedata: any, tableSize: any) {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let farmerValue = this.getSelectedValues(this.searchForm.get('farmer')?.value);

    console.log(villageValue, khasraValue, farmerValue);

    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue.value : 0,
      khasraNo: khasraValue ? khasraValue.value : '',
      farmerName : farmerValue  ? farmerValue.text : ''
    }
    this.acquisitionService.acquisitionList(data).subscribe((res: any) => {
      this.isLoading = false
      this.acquisitionList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)

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
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
    });
  }

  deleteAcquisition(item: any) {
    let param = {
      villageId: item?.village_id,
      khasraNo : item?.khasra_no.replace(/\s+/g, ''),
      id: item?.acquisition_id
    };
    let url = this.acquisitionService.deleteAcquisition(param)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.farmar_name,
        content: 'Are you sure want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModelRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.status == 200) {
          this.notificationSerivce.successAlert('deleted Successfully');
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
        } else {
          this.notificationSerivce.errorAlert('Acquisition Not Deleted');
        }
      }
    );
  }
}
