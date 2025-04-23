import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcquisitionService } from '../../../../master/acquisition-master/service/acquisition.service';

@Component({
  selector: 'village-report-list',
  standalone: false,
  templateUrl: './village-report-list.component.html',
  styleUrl: './village-report-list.component.scss'
})
export class VillageReportListComponent {
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
  villageList:any;
  khasraList: any;
  searchForm!: FormGroup;
  acquisitionList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private commonService: CommonService,
    private fb : FormBuilder,
    private acquisitionService : AcquisitionService
  ){};

  ngOnInit() {
    this.getVillageList();
    this.setInitialTable();
    this.setInitialValue();
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
      khasra: [null]
    })
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village' },
      { key: '', title: 'Farmer'},
      { key: '', title: 'Project Area' },
      { key: '', title: 'Khasra No.' },
      { key: '', title: 'Purchase Registery' },
      { key: '', title: 'Purchase Karar' },
      { key: '', title: 'Purchase Registery Balance' },
      { key: '', title: 'Purchase Karar Balance' },
      { key: '', title: 'LMC Resumed' },
      { key: '', title: 'LMC Leased' },
      { key: '', title: 'Left In Abadi' },
      { key: '', title: 'Abadi Allotted' },
      { key: '', title: 'LMC Area' }
    ]
  }
  
  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
     
      if (this.villageList && this.villageList?.length > 0) {
        this.searchForm.get('village')?.setValue(this.villageList[0]);
        this.getKhasraBasedOnVillage((this.villageList[0].value));
        this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)

    } else {
      this.khasraList = [];
      this.acquisitionList = [];
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
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit);
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    } else {
      return '';
    }
  }


  getAcqusitionList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue : '',
      khasraNo: khasraValue ? Number(khasraValue) : ''
    }
    this.acquisitionService.acquisitionList(data).subscribe((res: any) => {
      this.isLoading = false
      this.acquisitionList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
  }
}
