import { Component } from '@angular/core';
import { SurveyService } from '../../service/survey.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-survey-list',
  standalone: false,
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  surveyList: any;
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
    private fb : FormBuilder,
    private commonService: CommonService,
    private surveyService: SurveyService,
  ) {}

  ngOnInit() {
    this.setInitialValue();
    this.getVillageList();
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
        this.getSurveyList(this.pagesize.offset, this.pagesize.limit)
      }
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.searchForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value?.value);
      this.getSurveyList(this.pagesize.offset, this.pagesize.limit)
    } else {
      this.khasraList = [];
      this.surveyList = [];
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
    this.getSurveyList(this.pagesize.offset, this.pagesize.limit);
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    } else {
      return '';
    }
  }

  getSurveyList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let villageValue = this.getSelectedValues(this.searchForm.get('village')?.value);
    let khasraValue = this.getSelectedValues(this.searchForm.get('khasra')?.value);
    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: villageValue ? villageValue : '',
      khasraNo: khasraValue ? (khasraValue) : ''
    }
    this.surveyService.surveyList(data).subscribe((res:any) => {      
      this.isLoading = false;
      this.surveyList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getSurveyList(this.pagesize.offset, this.pagesize.limit);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;    
    this.getSurveyList(this.pagesize.offset, this.pagesize.limit);

  }

}
