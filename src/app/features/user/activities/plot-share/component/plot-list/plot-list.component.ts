import { Component } from '@angular/core';
import { PlotService } from '../../service/plot.service';
import { LocalStorageService } from '../../../../../shared/services/localstorage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-plot-list',
  standalone: false,
  templateUrl: './plot-list.component.html',
  styleUrl: './plot-list.component.scss'
})
export class PlotListComponent {
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder : 'Select Village'
  };
  villageList: any;
  spinnerLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  public columns!: any;
  plotList:any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  plotform!: FormGroup

  constructor(
    private plotService : PlotService,
    private fb : FormBuilder,
    private commonService : CommonService
  ) {};

  ngOnInit() {
    this.setInitialvalue()
    this.getVillageList();
    this.setInitialtable()
  }

  setInitialvalue() {
    this.plotform = this.fb.group({
      village : [null],
      search : ['']
    })
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res:any) => {
      this.villageList = res?.body?.result || [];
      if(this.villageList && this.villageList?.length > 0) {
        this.plotform.get('village')?.setValue(this.villageList[0]);
        this.getPlotList(this.pagesize.offset, this.pagesize.limit)
      }      
    })
  }

  setInitialtable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Khasra No' },
      { key: '', title: 'Total Area(Sq M)' },
      { key: '', title: 'Purchase Area(Sq M)' },
      { key: '', title: 'Pending Area(Sq M)' },
      { key: '', title: 'Village Name' },
    ];
  }

  changeVillage(event:any) {
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }

  onSearchPlot(event:any) {
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }

  getPlotList(pagedata: any, tableSize: any) {
    this.spinnerLoading = true;
    let data = {
      villageId : Number(this.plotform.get('village')?.value?.value),
      searchText :this.plotform.get('search')?.value == '' ? 'All' : this.plotform.get('search')?.value,
      pageNumber : pagedata,
      pageSize : tableSize
    }

    this.plotService.plotShareDetails(data).subscribe((res:any) => {
    this.spinnerLoading = false;
      this.plotList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getPlotList(this.pagesize.offset, this.pagesize.limit)
  }
} 
 