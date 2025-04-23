import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AcquisitionService } from '../../../../master/acquisition-master/service/acquisition.service';
import { setShowLogin } from '../../../../../../core/app.action';
import { selectToken } from '../../../../../../core/app.selectors';
import { AppState } from '../../../../../../core/app.reducer';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ShowFileOfKhasraComponent } from '../show-file-of-khasra/show-file-of-khasra.component';

@Component({
  selector: 'app-village-wise-details',
  standalone: false,
  templateUrl: './village-wise-details.component.html',
  styleUrl: './village-wise-details.component.scss'
})
export class VillageWiseDetailsComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  columns: any;
  khasraDetailsList: any;
  khasraId: any;
  villageId: any;
  token$: Observable<any>;
  tokenValue: any;
  bsmodalRef!: BsModalRef;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  constructor(
    private route: ActivatedRoute,
    private acquisitionService : AcquisitionService,
    private store: Store<AppState>,
    private bsModalService: BsModalService
  ){
    this.token$ = this.store.select(selectToken);
    this.token$.subscribe(token => {
      this.tokenValue = token
    })
  };

  ngOnInit() {
    this.khasraId = this.route?.snapshot.paramMap.get('khasraId')!;
    this.villageId = this.route?.snapshot.paramMap.get('villageId')!;
    this.setInitialTable()
    if(this.khasraId && this.villageId) {
      this.getAcqusitionList(this.pagesize.offset, this.pagesize.limit)    
    }    
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Acquisition' },
      { key: '', title: 'Village' },
      { key: '', title: 'Farmer Name' },
      { key: '', title: 'Khasra No.' },
      { key: '', title: 'Acquisition Date' },
      { key: '', title: 'Party' },
      { key: '', title: 'Purchase Karar' },
      { key: '', title: 'Balance Karar' },
      { key: '', title: 'Balance Registery' },
      { key: '', title: 'Purchase Registery' },
      { key: '', title: 'Purchase Farmer Name' },
      { key: '', title: 'Transfer Suncity Uchd' },
      { key: '', title: 'Left Abadi' },
      { key: '', title: 'Court Area' },
      { key: '', title: 'Dispute Area' },
      { key: '', title: 'Case Remark' },
      { key: '', title: 'IMC Resume' },
      { key: '', title: 'Plot Share' },
      { key: '', title: 'IMC Leased' },
      { key: '', title: 'Abadi Alloted' },
    ]
  }

  getAcqusitionList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    let data = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: this.villageId,
      khasraNo: this.khasraId
    }
    this.acquisitionService.acquisitionList(data).subscribe((res: any) => {
      this.isLoading = false
      this.khasraDetailsList = res?.body?.result || [];
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

  onLogin(type :any): void {  
    if(!this.tokenValue) {
      this.store.dispatch(setShowLogin({ showLogin: true } ));
    } else {
      const initialState: ModalOptions = {
              initialState: {
                type:type,
                pdfData : 'Vill_15_1224_Registry.pdf'
              },
            };
            this.bsmodalRef = this.bsModalService.show(
              ShowFileOfKhasraComponent,
              Object.assign(initialState, {
                id: "confirmation",
                class: "modal-xl modal-dialog-centered",
              })
            );
    }
  } 
}
