import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { PlotService } from '../../services/plot.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plot-list',
  standalone: false,
  templateUrl: './plot-list.component.html',
  styleUrl: './plot-list.component.scss'
})
export class PlotListComponent {
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
  config1 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Khasra`,
    searchPlaceholder: "Search Khasra"
  };
  villageList: any;
  khasraList: any;
  plotList: any;
  searchForm! : FormGroup;
  columns: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private commonService: CommonService,
    private plotService : PlotService,
    private fb : FormBuilder
  ){}

  ngOnInit() {
    this.setInitialValue()
    this.getVillageList();
    this.setInitialTable()
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
      khasra: [null]
    })
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'Sector' },
      { key: '', title: 'Plot No' },
      { key: '', title: 'Inventory' },
      { key: '', title: 'Unit No' },
      { key: '', title: 'Status' },
      { key: '', title: 'Images' },
      { key: '', title: 'Action' },
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

  getKhasraBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {
      this.khasraList = res?.body?.result || [];
      this.getPlotList(this.pagesize.offset, this.pagesize.limit)
    })
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    } else {
      return '';
    }
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getPlotList(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.plotList = [];
      this.khasraList = [];
      this.searchForm.get('khasra')?.setValue(null);
      return
    }
  }

  onChangeKhasra(event: any) {
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }

  getPlotList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let data = {
      pageNumber: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue : '',
      khasraNo: 1331
    }
    this.plotService.plotList(data).subscribe((res: any) => {
    this.isLoading = false;
      this.plotList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)

  }

  onCreatePlot(value:any){

  }
}
