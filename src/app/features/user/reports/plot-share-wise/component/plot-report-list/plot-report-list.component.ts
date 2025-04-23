import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plot-report-list',
  standalone: false,
  templateUrl: './plot-report-list.component.html',
  styleUrl: './plot-report-list.component.scss'
})
export class PlotReportListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  khasraList: any;
  villageList: any;
  plotShareList: any;
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

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  searchForm!: FormGroup;

  constructor(
    private commonService : CommonService,
    private fb : FormBuilder
  ){}

  ngOnInit() {
    this.setInitialValue()
    this.getVillageList()
    this.setInitialTable();
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
      { key: '', title: 'LMC Area' },
      { key: '', title: 'Notified Area Sec4' },
      { key: '', title: 'Dispute' },
      { key: '', title: 'Phase' }
    ]
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
     
      if (this.villageList && this.villageList?.length > 0) {
        this.searchForm.get('village')?.setValue(this.villageList[0]);
        this.getKhasraBasedOnVillage((this.villageList[0].value));
      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);

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
    // this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
