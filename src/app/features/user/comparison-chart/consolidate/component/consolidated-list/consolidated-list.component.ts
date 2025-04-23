import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';
import { ConsolidatedService } from '../../services/consolidated.service';

@Component({
  selector: 'app-consolidated-list',
  standalone: false,
  templateUrl: './consolidated-list.component.html',
  styleUrl: './consolidated-list.component.scss'
})
export class ConsolidatedListComponent {
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
  columns: any;
  consolidateList: any;
  villageList: any;
  searchForm!: FormGroup
  khasraList: any;

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
    private ConsolidatedService : ConsolidatedService
  ) { }

  ngOnInit() {
    this.getVillageList();
    this.setInitialValue()
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
      khasra: [null]
    })
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
      if (this.villageList && this.villageList?.length > 0) {
        this.searchForm.get('village')?.setValue(this.villageList[0]);
        this.getKhasraBasedOnVillage((this.villageList[0].value));
        this.getConsolidatedList(this.pagesize.offset, this.pagesize.limit)
      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getConsolidatedList(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.khasraList = [];
      this.consolidateList = [];
      this.searchForm.get('khasra')?.setValue(null);
      return
    }
  }

  getKhasraBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {
      this.khasraList = res?.body?.result || [];
    })
  }

  onChangeKhasra(event: any) {
    this.getConsolidatedList(this.pagesize.offset, this.pagesize.limit);
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    } else {
      return '';
    }
  }

  getConsolidatedList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue : '',
      khasraNo: khasraValue ? (khasraValue) : ''
    }
    this.ConsolidatedService.consolidatedList(data).subscribe((res: any) => {
      this.isLoading = false;
      this.consolidateList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getConsolidatedList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getConsolidatedList(this.pagesize.offset, this.pagesize.limit)
  }

  
}
