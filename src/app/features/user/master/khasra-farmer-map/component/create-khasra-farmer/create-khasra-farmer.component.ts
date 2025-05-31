import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { KhasraFarmerService } from '../../service/khasra-farmer.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-create-khasra-farmer',
  standalone: false,
  templateUrl: './create-khasra-farmer.component.html',
  styleUrl: './create-khasra-farmer.component.scss',
})
export class CreateKhasraFarmerComponent {
  @Output() mapdata = new EventEmitter();
  khasraFarmerForm!: FormGroup;
  label: string = 'Create';
  villageList: any;
  config = {
    displayKey: 'text',
    search: true,
    height: '300px',
  };
  khasraList: any;
  farmerList: any;
  editData: any;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private commonService: CommonService,
    private khasraFarmerService: KhasraFarmerService,
    private notificationService: NotificationService
  ) { };

  ngOnInit() {
    this.setInitialForm();
    this.getVillageList();
  }

  setInitialForm() {
    this.khasraFarmerForm = this.fb.group({
      village: [null, [Validators.required]],
      khasra: [null, [Validators.required]],
      farmer: [null, [Validators.required]],
    });

    this.setKhasraFarmerValue();
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if (this.editData) {
        let selectVillage = this.villageList.find((val: any) => val?.value == this.editData?.village_id);
        this.khasraFarmerForm.patchValue({
          village: selectVillage
        })
      }
    })
  }

  getKhasraList(id: any) {
    let payload = {
      villageId: Number(id)
    }
    this.commonService.khasraBasedOnVillage(payload).subscribe((res: any) => {
      this.khasraList = res.body?.data || [];
      if (this.editData) {
        let selectKhasra = this.khasraList.find((val: any) => val?.value == this.editData?.khasra_id);
        this.khasraFarmerForm.patchValue({
          khasra: selectKhasra
        });
      };
    })
  }

  getFarmerList(id: any) {
    let payload = {
      villageId: Number(id),
      khasraId: 0
    }
    this.commonService.commonFarmer(payload).subscribe((res: any) => {
      this.farmerList = res?.body?.data || [];
      if (this.editData) {
        let selectFarmer = this.farmerList.find((val: any) => val?.value == this.editData?.farmer_id);
        this.khasraFarmerForm.patchValue({
          farmer: selectFarmer
        });
      };
    })
  }

  setKhasraFarmerValue() {    
    this.khasraFarmerForm.get('village')?.valueChanges.subscribe((value) => {            
      if (!Array.isArray(value.value) && value?.value) {
        this.farmerList = [];
        this.khasraList = [];
        this.getKhasraList(value.value);
        this.getFarmerList(value.value);
      } else {
        this.farmerList = [];
        this.khasraList = [];
        this.khasraFarmerForm.patchValue({
          khasra: null,
          farmer: null
        })
      }
    })
  }

  submit(e: any, formvalue: any) {
    e.preventDefault();
    if (this.khasraFarmerForm.invalid) {
      this.khasraFarmerForm.markAllAsTouched();
      return;
    };
    let payload = {
      "mapping_id": 0,
      "village_id": Number(formvalue?.village?.value) || 0,
      "village_code": formvalue?.village?.text.split('(')[1].replace(')', '') || null,
      "village_name": null,
      "khasra_id": Number(formvalue?.khasra?.value) || 0,
      "khasra_no": formvalue?.khasra?.text.split(' ')[0] || null,
      "farmer_id": Number(formvalue?.farmer?.value) || 0,
      "farmer_name": formvalue?.farmer?.text,
      "created_by": this.commonService.getUserId(),
    }
    
    let service = this.khasraFarmerService.addKhasraFarmer(payload);
    if(this.editData) {
      payload['mapping_id'] = this.editData?.mapping_id;
      service = this.khasraFarmerService.updateKhasraFarmer(payload)
    }
    service.subscribe((res: any) => {
      if (res?.body?.statusCode === 200) {
        this.notificationService.showSuccess(res?.body?.message);
        this.modalService.hide();
        this.mapdata.emit();
      } else {
        this.notificationService.showError(res?.body?.message);
      };
    });
  };

  close() {
    this.modalService.hide();
  }
}
