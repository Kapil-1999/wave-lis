import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcquisitionService } from '../../service/acquisition.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-acquisition',
  standalone: false,
  templateUrl: './create-acquisition.component.html',
  styleUrl: './create-acquisition.component.scss'
})
export class CreateAcquisitionComponent {
  label :string = 'Create';
  villageList: any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',

};
  khasraList: any;
  farmerList: any;
  companyList: any;
  acquisitionForm! : FormGroup


  constructor(
    private modalService : BsModalService,
    private commonService : CommonService,
    private fb : FormBuilder,
    private acquisitionService : AcquisitionService,
    private notificationService : NotificationService
  ){}

  ngOnInit() {
    this.setInitialValue()
    this.getVillageList();
  }

  setInitialValue() {
    this.acquisitionForm = this.fb.group({
      village: [null, Validators.required],
      khasra: [null, Validators.required],
      farmer: [null, Validators.required],
      company: [null, Validators.required],
      acquisitionDate: [null, Validators.required],
      purchaseKarar: [''],
      balanceKarar: [''],
      balanceRegistery: [''],
      purchaseRegistery: [''],
      transferSuncity: [''],
      leftAbadi: [''],
      abadiAlloted: [''],
      disputeArea: [''],
      lmcResume: [''],
      lmcLeased: [''],
      courtArea: [''],
      caseRemark: ['']
    });
  }


  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
    })
  }


  onChangeVillage(event:any) {
    if (!Array.isArray(event?.value)) {
      this.acquisitionForm.get('khasra')?.setValue(null);
      this.acquisitionForm.get('farmer')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value.value);
      this.getFarmerBasedOnVillage(event.value.value);
    } else {
      this.khasraList = [];
      this.farmerList = [];
      this.acquisitionForm.get('khasra')?.setValue(null);
      this.acquisitionForm.get('farmer')?.setValue(null);
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

  getFarmerBasedOnVillage(id: any) {
    let data = {
      villageId: Number(id)
    }
    this.commonService.commonFarmer(data).subscribe((res: any) => {
      this.farmerList = res?.body?.result || [];
    })
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data;
    }
  }

  submit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.acquisitionForm.invalid) {
      this.acquisitionForm.markAllAsTouched();
      return;
    }
    let payload = {
      "acquisition_id": 0,
      "village_id": Number(formvalue.village.value),
      "khasra_no": formvalue?.khasra.value.replace(/\s+/g, ''),
      "farrmer_id":Number(formvalue.farmer.value),
      "farmar_name": formvalue.farmer.text,
      "acquition_date": formvalue.acquisitionDate,
      "party": formvalue?.company.value,
      "purchase_karar": Number(formvalue?.purchaseKarar),
      "balance_karar": Number(formvalue?.balanceKarar),
      "balance_registery": Number(formvalue?.balanceRegistery),
      "purchaseregistery": Number(formvalue?.purchaseRegistery),
      "transfer_suncity_uchd": Number(formvalue?.transferSuncity),
      "left_in_abadi": Number(formvalue?.leftAbadi),
      "abadi_alloted": Number(formvalue?.abadiAlloted),
      "dispute_area": formvalue?.disputeArea,
      "case_remark": formvalue?.caseRemark,
      "lmc_resume": Number(formvalue?.lmcResume),
      "lmc_leased": Number(formvalue?.lmcLeased),
      "court_area": Number(formvalue?.courtArea)
    };

    let service = this.acquisitionService.addAcquisition(payload);

    service.subscribe((res:any) => {
      if (res?.body?.isSuccess == true) {
        this.modalService.hide()
        this.notificationService.successAlert('Created Succesfully');
      }else if(res?.error?.statusCode == 403){
        this.notificationService.errorAlert(res?.error?.errorMessages);
      } else {
        this.notificationService.errorAlert('Acquisition Not Created');
      }
    })  
  }

 close() {
    this.modalService.hide()
  }
}
