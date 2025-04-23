import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KhasraService } from '../../service/khasra.service';
import { CreateKhasraComponent } from '../create-khasra/create-khasra.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

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
  searchForm! : FormGroup;
  columns: any;
  bsModalRef! : BsModalRef
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private fb : FormBuilder,
    private khasraService : KhasraService,
    private bsmodalService : BsModalService,
    private modalService : BsModalService,
    private notificationSerivce : NotificationService
  ){}

  ngOnInit() {
    this.setInitialValue()
   this.getKhasraList(this.pagesize.offset, this.pagesize.limit);
    this.setInitialTable()
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
    })
  }

  setInitialTable() {
    this.columns = [
      {key: 'S.No', title: 'S.No'},
      { key: 'Khasra No', title: 'Khasra No' },
      {key : 'Khata No', title : 'Khata No'},
      { key: 'Village Name', title: 'Village Name' },
      { key: 'Notified Area', title: 'Notified Area' },
      { key: 'Lmc Area', title: 'Lmc Area' },
      { key: 'Project Area', title: 'Project Area' },
      { key: 'Registration Date', title: 'Registration Date' },
      { key: 'Action', title: 'Action' },
    ]
  }

  getKhasraList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let data = {
      pageNumber: pagedata,
      pageSize: tableSize,
    }
    this.khasraService.khasraList(data).subscribe((res: any) => {
    this.isLoading = false;
      this.khasraList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getKhasraList(this.pagesize.offset, this.pagesize.limit)

  }

  onCreateKhasra(value:any){
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
      this.getKhasraList(this.pagesize.offset, this.pagesize.limit)
    });
  }

  onDeleteKhasra(item:any) {
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
          this.notificationSerivce.successAlert(value?.body?.actionResponse);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getKhasraList(this.pagesize.offset, this.pagesize.limit)
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }
}
