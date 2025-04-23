import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../../../../shared/services/localstorage.service';
import { FarmerReportService } from '../../service/farmer-report.service';

@Component({
  selector: 'app-farmer-report-list',
  standalone: false,
  templateUrl: './farmer-report-list.component.html',
  styleUrl: './farmer-report-list.component.scss'
})
export class FarmerReportListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  khasraList: any;
  villageList: any;
  farmerReportList: any;
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
  activeTab: string = '1';

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  searchForm!: FormGroup;
  tabs = [
    { id: '1', title: 'No Purchase' },
    { id: '2', title: 'Purchase Plots' },
  ];

  constructor(
    private commonService : CommonService,
    private fb : FormBuilder,
    private localStorageService: LocalStorageService,
    private farmerReportService : FarmerReportService
  ){}

  ngOnInit() {
    this.setInitialValue();  
    this.setInitialTable();
    this.getVillageList();   
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
      { key: '', title: 'Khasra No' },
      { key: '', title: 'Farmer'},
      { key: '', title: 'Village' },
      { key: '', title: 'Balance Karar' },
      { key: '', title: 'Balance Registery' },
      { key: '', title: 'Left In Abadi' },
    ]
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
     
      if (this.villageList && this.villageList?.length > 0) {
        this.searchForm.get('village')?.setValue(this.villageList[0]);
        this.getKhasraBasedOnVillage((this.villageList[0].value));
        this.getFarmerWiseReport(this.pagesize.offset, this.pagesize.limit);

      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getFarmerWiseReport(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.khasraList = [];
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


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getFarmerWiseReport(this.pagesize.offset, this.pagesize.limit)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getFarmerWiseReport(this.pagesize.offset, this.pagesize.limit)

  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.getFarmerWiseReport(this.pagesize.offset, this.pagesize.limit)
  }

  
  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    } else {
      return 0;
    }
  }

  getFarmerWiseReport(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let userId = this.localStorageService.getItem('user_id');
    
    let payload =  {
      userId: userId,
      reportType: this.activeTab,
      villageId: villageValue,
      farmerId: khasraValue || 0,
      pageNumber: pagedata,
      pageSize: tableSize
    }    
    this.farmerReportService.farmerReport(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.farmerReportList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }
}

