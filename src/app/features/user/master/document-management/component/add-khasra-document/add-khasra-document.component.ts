import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { DocumentService } from '../../services/document.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-add-khasra-document',
  standalone: false,
  templateUrl: './add-khasra-document.component.html',
  styleUrl: './add-khasra-document.component.scss'
})
export class AddKhasraDocumentComponent {
  @Output() mapdata = new EventEmitter();

  label: string = "Add";
  documentForm!: FormGroup;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
  };
  villageList: any;
  khasraList: any;
  documentType = [
    { value: 'SaleDeed', text: 'Sale Deed' },
    { value: 'Mutation', text: 'Mutation' },
    { value: 'Registry', text: 'Registry' }
  ];
  base64Photo: any;
  editData: any;

  constructor(
    private bsmodalService: BsModalService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private documentService: DocumentService,
    private notificationService: NotificationService
  ) { };

  ngOnInit() {
    this.setInitialForm();
    this.getVillageList();
  }

  setInitialForm() {
    this.documentForm = this.fb.group({
      village: [null, [Validators.required]],
      khasra: [null, [Validators.required]],
      doc_type: [null, [Validators.required]],
      image: [null], 
      useExistingFile: [false]
    }, { validator: this.documentValidator });

    if (this.editData) {
      this.documentForm.patchValue({
        doc_type: this.editData?.doc_type,
        useExistingFile: !!this.editData.doc_path
      });
    }
  }

  documentValidator(group: FormGroup): ValidationErrors | null {
    const image = group.get('image')?.value;
    const useExistingFile = group.get('useExistingFile')?.value;

    if (!image && !useExistingFile) {
      return { documentRequired: true };
    }
    return null;
  }

  getPdfUrl(): string {
    return 'data:application/pdf;base64,' + this.base64Photo;
  }

  removeExistingFile(): void {
    this.documentForm.patchValue({
      useExistingFile: false
    });
    this.base64Photo = null;
    this.documentForm.get('image')?.reset();
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if (this.editData) {
        let selectVillage = this.villageList.find((val: any) => val?.value == this.editData?.village_id);
        this.documentForm.patchValue({
          village: selectVillage
        })
        this.getKhasraBasedOnVillage(selectVillage?.value)
      };
    })
  }

  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.documentForm.get('khasra')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value.value);
    } else {
      this.khasraList = [];
      this.documentForm.get('khasra')?.setValue(null);
      return
    }
  }

  getKhasraBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {
      this.khasraList = res?.body?.data || [];
      if (this.editData) {
        let selectKhasra = this.khasraList.find((val: any) => val?.value == this.editData?.khasra_id);
        this.documentForm.patchValue({
          khasra: selectKhasra
        });
      };
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.base64Photo = base64String.split(',')[1];
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    }
  }

  submit(e: any, formvalue: any) {
    e.preventDefault();
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    };

    let payload = {
      "khasra_doc_id": 0,
      "acquisition_id": 0,
      "village_id": Number(formvalue?.village?.value),
      "village_code": formvalue?.village?.text.split('(')[1].replace(')', '') || null,
      "khasra_id": Number(formvalue?.khasra?.value),
      "khasra_no": formvalue?.khasra?.text.split('(')[0].trim() || null,
      "doc_type": formvalue?.doc_type,
      "doc_base64_str": this.base64Photo || null,
      "doc_path": this.editData?.doc_path && !this.base64Photo ? this.editData?.doc_path : null,
      "created_by": this.commonService.getUserId(),
    };
    let service = this.documentService.addKhasraDoc(payload)
    if (this.editData) {
      payload['khasra_doc_id'] = this.editData?.khasra_doc_id
      service = this.documentService.updateKhasraDoc(payload)
    }
    service.subscribe((res: any) => {
      if (res?.body?.statusCode === 200) {
        this.notificationService.showSuccess(res?.body?.message);
        this.bsmodalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.message);
      };
    })

  }

  close() {
    this.bsmodalService.hide();
  }
}
