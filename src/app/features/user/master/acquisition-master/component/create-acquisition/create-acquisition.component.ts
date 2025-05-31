import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AcquisitionService } from '../../service/acquisition.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-acquisition',
  standalone: false,
  templateUrl: './create-acquisition.component.html',
  styleUrl: './create-acquisition.component.scss'
})
export class CreateAcquisitionComponent {
  @Output() mapdata = new EventEmitter();

  label: string = 'Create';
  villageList: any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',

  };
  khasraList: any;
  farmerList: any;
  partyData: any;
  acquisitionForm!: FormGroup;
  documentType = [
    { value: 'SaleDeed', text: 'Sale Deed' },
    { value: 'Mutation', text: 'Mutation' },
    { value: 'Registry', text: 'Registry' }
  ];
  editData: any;
  base64Photo: string = '';
  disputedAreaData: any;


  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private acquisitionService: AcquisitionService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    console.log(this.editData);

    this.setInitialValue()
    this.getVillageList();
    this.getPartyList();
  }

  setInitialValue() {
    this.acquisitionForm = this.fb.group({
      village: [null, Validators.required],
      khasra: [null, Validators.required],
      farmer: [null, [Validators.required]],
      party: [null, [Validators.required]],
      purchaseFarmerName: [null, [Validators.required]],
      acquistion_area: [0, [
        Validators.required,
        (control: any) => this.maxAcquisitionValidator(control)
      ]],
      acquisitionDate: [null, Validators.required],
      total: [0],
      purchaseRegistery: [0, [this.maxValueValidator.bind(this)]],
      balanceRegistery: [0, [this.maxValueValidator.bind(this)]],
      purchaseKarar: [0, [this.maxValueValidator.bind(this)]],
      balanceKarar: [0, [this.maxValueValidator.bind(this)]],
      abadiAlloted: [0, [this.maxValueValidator.bind(this)]],
      lmcLeased: [0, [this.maxValueValidator.bind(this)]],
      transferSuncity: [0, [this.maxValueValidator.bind(this)]],
      disputeArea: [0, [this.maxValueValidator.bind(this)]],
      courtArea: [0, [this.maxValueValidator.bind(this)]],
      document: [null],
      doc_base64_str: [null],
      caseRemark: [null]
    });

    this.acquisitionForm.get('khasra')?.valueChanges.subscribe((khasraValue) => {
      const villageValue = this.acquisitionForm.get('village')?.value;

      if (villageValue?.value && khasraValue?.value && !Array.isArray(khasraValue?.value)) {
        if(!this.editData) {
          this.getKhasraDisputedData(khasraValue);
        }
        this.getFarmerList(khasraValue)
      } else {
        this.disputedAreaData = {};
        this.farmerList = [];
        this.acquisitionForm.get('farmer')?.setValue(null)
        this.acquisitionForm.patchValue({
          total: 0,
          acquistion_area: 0,
          court_case_area: 0,
          lmcLeased: 0,
          purchaseRegistery: 0,
          balanceRegistery: 0
        })
      }
    });
    this.setupCalculations();

    if (this.editData) {
      this.setEditedData()
    }
  };

  setEditedData() {
    let date = this.commonService.getLocalDateString(this.editData?.acquisition_date)
    this.acquisitionForm.patchValue({
      purchaseFarmerName: this.editData?.purchase_farmer_name,
      acquistion_area: this.editData?.acquisition_area,
      acquisitionDate: date,
      total: this.editData?.balance_registery + this.editData?.purchase_registery,
      purchaseRegistery: this.editData?.purchase_registery,
      balanceRegistery: this.editData?.balance_registery,
      purchaseKarar: this.editData?.purchase_karar,
      balanceKarar: this.editData?.balance_karar,
      abadiAlloted: this.editData?.abadi_alloted,
      lmcLeased: this.editData?.lmc_leased,
      transferSuncity: this.editData?.transfer_suncity,
      disputeArea: this.editData?.dispute_area,
      courtArea: this.editData?.court_area,
      document: this.editData?.doc_type,
      caseRemark: this.editData?.case_remark
    })
  }

  setupCalculations() {
    this.acquisitionForm.get('total')?.valueChanges.subscribe(() => this.calculateBalance());
    this.acquisitionForm.get('purchaseRegistery')?.valueChanges.subscribe(() => this.calculateBalance());
  }

  calculateBalance() {
    const total = this.acquisitionForm.get('total')?.value || 0;
    const purchaseRegistery = this.acquisitionForm.get('purchaseRegistery')?.value || 0;
    const balanceRegistery = total - purchaseRegistery;

    this.acquisitionForm.patchValue({
      balanceRegistery: balanceRegistery >= 0 ? balanceRegistery : 0
    }, { emitEvent: false });
  }

  maxAcquisitionValidator(control: AbstractControl): ValidationErrors | null {
    const total = this.acquisitionForm?.get('total')?.value || 0;
    const acquisitionArea = control.value;
    if (acquisitionArea <= 0) {
      return { minAcquisition: true };
    };
    if (acquisitionArea > total) {
      return { maxAcquisition: true };
    };
    return null;
  }

  maxValueValidator(control: AbstractControl): ValidationErrors | null {
    const total = this.acquisitionForm?.get('total')?.value || 0;
    if (control.value > total) {
      return { maxValue: true };
    }
    return null;
  }


  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if (this.editData) {
        let selectVillage = this.villageList.find((val: any) => val?.value == this.editData?.village_id);
        this.acquisitionForm.patchValue({
          village: selectVillage
        })
        this.getKhasraBasedOnVillage(selectVillage?.value)
      };
    });
  };


  onChangeVillage(event: any) {
    if (!Array.isArray(event?.value)) {
      this.acquisitionForm.get('khasra')?.setValue(null);
      this.acquisitionForm.get('farmer')?.setValue(null);
      this.getKhasraBasedOnVillage(event.value.value);
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
      this.khasraList = res?.body?.data || [];
       if (this.editData) {
        let selectKhasra = this.khasraList.find((val: any) => val?.value == this.editData?.khasra_id);
        this.acquisitionForm.patchValue({
          khasra: selectKhasra
        });
        this.getFarmerList(selectKhasra)   
      };
    })
  }

  getKhasraDisputedData(value: any) {
    let payload = {
      villageId: Number(this.acquisitionForm.get('village')?.value?.value),
      khasraId: Number(value?.value)
    }
    this.acquisitionService.khasraDisputedArea(payload).subscribe((res: any) => {
      this.disputedAreaData = res?.body?.data || {};
      if (this.disputedAreaData) {
        this.acquisitionForm.patchValue({
          total: this.disputedAreaData?.total_area,
          acquistion_area: this.disputedAreaData?.acquisition_area,
          court_case_area: this.disputedAreaData?.court_case_area,
          lmcLeased: this.disputedAreaData?.lmc_area,
        })
      }
    })
  }


  getFarmerList(value: any) {
    let payload = {
      villageId: Number(this.acquisitionForm.get('village')?.value?.value),
      khasraId: Number(value?.value)
    }
    this.commonService.commonFarmer(payload).subscribe((res: any) => {
      this.farmerList = res?.body?.data || [];
      if (this.editData) {
        let selectFarmer = this.farmerList.find((val: any) => val?.value == this.editData?.farmer_id);
        this.acquisitionForm.patchValue({
          farmer: selectFarmer
        });
      };
    });
  };

  getPartyList() {
    this.commonService.partyList().subscribe((res: any) => {
      this.partyData = res?.body?.data || [];
      if (this.editData) {
        let selectParty = this.partyData.find((val: any) => val?.text == this.editData?.party);
        this.acquisitionForm.patchValue({
          party: selectParty
        });
      };
    });
  };

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data;
    }
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
    if (this.acquisitionForm.invalid) {
      this.acquisitionForm.markAllAsTouched();
      return;
    };

    let payload = {
      "acquisition_id": 0,
      "village_id": Number(formvalue?.village?.value) || 0,
      "village_code": formvalue?.village?.text.split('(')[1].replace(')', '') || null,
      "khasra_id": Number(formvalue.khasra?.value) || 0,
      "khasra_no": formvalue.khasra?.text?.split(' ')[0] || null,
      "farmer_id": Number(formvalue.farmer?.value) || 0,
      "farmar_name": formvalue?.farmer.text || null,
      "balance_registery": formvalue.balanceRegistery || 0,
      "purchase_registery": formvalue.purchaseRegistery || 0,
      "purchase_karar": formvalue.purchaseKarar || 0,
      "balance_karar": formvalue.balanceKarar || 0,
      "purchase_farmer_name": formvalue.purchaseFarmerName || null,
      "transfer_suncity": formvalue.transferSuncity || 0,
      "left_in_abadi": 0,
      "court_area": formvalue.courtArea || 0,
      "dispute_area": formvalue.disputeArea || 0,
      "case_remark": formvalue.caseRemark || null,
      "lmc_resume": 0,
      "abadi_alloted": formvalue.abadiAlloted || 0,
      "new_plan_area": 0,
      "acquisition_area": formvalue.acquistion_area || 0,
      "p_share_id": 0,
      "lmc_leased": formvalue.lmcLeased || 0,
      "attribute_id": 0,
      "attribute_name": null,
      "party": formvalue.party?.value || null,
      "acquisition_date": formvalue.acquisitionDate,
      "doc_type": formvalue?.document || null,
      "doc_base64_str": this.base64Photo || null,
      "doc_path": this.editData?.doc_path && !this.base64Photo ? this.editData?.doc_path : null,
      "is_valid": 0,
      "is_active": this.editData?.is_active !== undefined ? this.editData.is_active : 1,
      "created_by": this.commonService.getUserId(),
    };

    let service = this.acquisitionService.addAcquisition(payload);

    if(this.editData) {
      payload['acquisition_id'] = this.editData?.acquisition_id;
      service = this.acquisitionService.updateAcquisition(payload)
    };

    service.subscribe((res: any) => {
      if (res?.body?.statusCode === 200) {
        this.notificationService.showSuccess(res?.body?.message);
        this.modalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.message);
      };
    });
  }

  close() {
    this.modalService.hide()
  }
}
