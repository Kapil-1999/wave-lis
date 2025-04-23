import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/localstorage.service';
import { MapViewService } from '../../../map/map-view/services/map-view.service';


@Component({
  selector: 'app-all-reports',
  standalone: false,
  templateUrl: './all-reports.component.html',
  styleUrl: './all-reports.component.scss'
})
export class AllReportsComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  searchKeyword: any;
  reportsData: any;
  selectedSummery: any;
  spinnerLoading: boolean = false;
  unit = 'sqm'
  totalStatus = [
    { key: 'Balance Karar', value: 0 },
    { key: 'Balance Registry', value: 0 },
    { key: 'Purchase Karar', value: 0 },
    { key: 'Purchase Registry', value: 0 },
    { key: 'Abadi Alloted', value: 0 }
  ];

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private localStorageService: LocalStorageService,
    private mapservice: MapViewService
  ) { }

  ngOnInit() {
    this.selectedSummery = history.state.reportData;
    this.setInitialtable();
    if (this.selectedSummery) {
      this.getReportData(this.pagesize.offset, this.pagesize.limit)
    }
  }

  setInitialtable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village Name' },
      { key: '', title: 'Balance Karar' },
      { key: '', title: 'Purchase Karar' },
      { key: '', title: 'Balance Registery' },
      { key: '', title: 'Purchase Registery' },
      { key: '', title: 'Left In Abadi' },
      { key: '', title: 'Abadi Allotted' },
      { key: '', title: 'Court Area' },
      { key: '', title: 'Dispute Area' },
      { key: '', title: 'Total Farmer' },
    ];
    if (this.selectedSummery.value == 'Farmer') {
      this.columns = [
        { key: '', title: 'S No.' },
        { key: '', title: 'Farmer Name' },
        { key: '', title: 'Village Name' },
        { key: '', title: 'Balance Karar' },
        { key: '', title: 'Purchase Karar' },
        { key: '', title: 'Balance Registery' },
        { key: '', title: 'Purchase Registery' },
        { key: '', title: 'Left In Abadi' },
        { key: '', title: 'Abadi Allotted' },
        { key: '', title: 'Court Area' },
        { key: '', title: 'Dispute Area' },
      ]
    }
  }

  getReportData(pagedata: any, tableSize: any) {
    this.spinnerLoading = true
    let param = {
      deptId: this.localStorageService.getItem('dept_id'),
      userId: this.localStorageService.getItem('user_id'),
      phaseNo: 'Phase1',
      reqType: this.selectedSummery.value,
      pageNumber: pagedata,
      pageSize: tableSize,
      unit: this.unit
    };
    this.mapservice.getDashboardTabReport(param).subscribe((res: any) => {
      this.spinnerLoading = false;
      this.reportsData = res?.result || [];
      this.pagesize.count = res?.totalRow;
      if (this.reportsData && this.reportsData?.length > 0) {
        this.totalsum()
      }
    })
  }

  totalsum() {  
    this.reportsData.forEach((val: any) => {
      this.totalStatus[0].value += val?.balance_karar || 0; 
      this.totalStatus[1].value += val?.balance_registery || 0; 
      this.totalStatus[2].value += val?.purchase_karar || 0;
      this.totalStatus[3].value += val?.purchase_registery || 0; 
      this.totalStatus[4].value += val?.abadi_alloted || 0;
    });
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getReportData(this.pagesize.offset, this.pagesize.limit)

  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getReportData(this.pagesize.offset, this.pagesize.limit)


  }
} 
