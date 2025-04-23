import { Component } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateFarmerComponent } from '../create-farmer/create-farmer.component';

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
  bsModalRef!: BsModalRef

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private farmerService: FarmerService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.setInitialtable();
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village Name' },
      { key: '', title: 'Farmer Name' },
      { key: '', title: 'Registration Date' },
      { key: '', title: 'Address' },
      { key: '', title: 'Phone' },
      { key: '', title: 'Action' },
    ]
  }


  getFarmerList(offset: number, limit: number) {
    this.isLoading = true;
    let data = {
      pageNo: offset,
      pageSize: limit,
    }
    this.farmerService.farmerList(data).subscribe((res: any) => {
      this.isLoading = false;
      this.farmerData = res?.body?.result || [];
      this.pagesize.count = res.boyd?.totalRow;
    })
  }



  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getFarmerList(this.pagesize.offset, this.pagesize.limit)
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
      this.getFarmerList(this.pagesize.offset, this.pagesize.limit)
    });
  }
}
