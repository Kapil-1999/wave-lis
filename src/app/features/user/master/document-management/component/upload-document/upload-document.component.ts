import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../shared/services/common.service';
import { DocumentService } from '../../services/document.service';
import { IMG_URL } from '../../../../../shared/constant/menu';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddKhasraDocumentComponent } from '../add-khasra-document/add-khasra-document.component';

@Component({
  selector: 'app-upload-document',
  standalone: false,
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.scss'
})
export class UploadDocumentComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  villageList: any;
  columns: any;
  documentData: any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Vilage`,
    searchPlaceholder: "Search Village"
  };
  imageUrl = IMG_URL
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private documentService: DocumentService,
    private modalService: BsModalService
  ) { };

  ngOnInit() {
    this.setInitialValue();
    this.setInitialTable()
    this.getVillageList();
    this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  setInitialValue() {
    this.searchForm = this.fb.group({
      village: [null],
      searchKeyword: ['']
    })
  }

  setInitialTable() {
    this.columns = [
      { key: '', title: 'S No.' },
      { key: '', title: 'Village' },
      { key: '', title: 'Khasra No.' },
      { key: '', title: 'Document Type' },
      { key: '', title: 'Document' },
      { key: '', title: 'Action' }
    ]
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }

  getDocumentList(pagedata: any, tableSize: any, searchKeyword: any) {
    let payload = {
      pageNo: pagedata,
      pageSize: tableSize,
      villageId: Array.isArray(this.searchForm.get('village')?.value) ? 0 : (this.searchForm.get('village')?.value?.value || 0),
      searchText: searchKeyword
    }
    this.documentService.documentList(payload).subscribe((res: any) => {
      this.documentData = res?.body?.data;
      this.pagesize.count = this.documentData[0].total_count
    })
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  onSearch(event: any) {
    const searchValue = event.target.value.trim().replace(/\s+/g, ' ');
    this.searchForm.get('searchKeyword')?.patchValue(searchValue);
    this.documentData = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  clearSearch() {
    this.searchForm.get('searchKeyword')?.patchValue('');
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
  }

  bsModalRef!: BsModalRef
  onAddDocument(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      AddKhasraDocumentComponent,
      Object.assign(initialState, {
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDocumentList(this.pagesize.offset, this.pagesize.limit, this.searchForm.get('searchKeyword')?.value);
    });
  }

}
