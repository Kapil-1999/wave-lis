import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerService } from '../../services/farmer.service';
import { formatDate } from '@angular/common';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { VilageService } from '../../../village-master/service/vilage.service';

@Component({
  selector: 'app-create-farmer',
  standalone: false,
  templateUrl: './create-farmer.component.html',
  styleUrl: './create-farmer.component.scss'
})
export class CreateFarmerComponent {
  @Output() mapdata = new EventEmitter()

  label: string = 'Create'
  villageList: any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
  };
  relationData: any = [
    { value: 'S/O', text: 'S/O' },
    { value: 'W/O', text: 'W/O' }
  ];
  farmerForm!: FormGroup;
  status = [
    { value: 'Active', id: 1 },
    { value: 'Inactive', id: 0 },
  ];
  editData: any

  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private farmerService: FarmerService,
    private NotificationService: NotificationService,
    private bsmodalService: BsModalService,
  ) { }

  ngOnInit() {
    this.setInitialState()
    this.getVillageList()
  }

  setInitialState() {
    this.farmerForm = this.fb.group({
      village: [null, [Validators.required]],
      name: [null, [Validators.required]],
      relation: ['S/O', [Validators.required]],
      relationName: [null, [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [null],
    });

    if (this.editData) {
      this.label = 'Update';
      this.farmerForm.patchValue({
        name: this.editData?.farmer_name,
        relation: this.editData?.relation,
        relationName: this.editData?.father_name,
        mobile: this.editData?.phone_no,
        address: this.editData?.address,
      })
    }
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if (this.editData) {
        let selectVillage = this.villageList.find((val: any) => val?.value == this.editData?.village_id);
        this.farmerForm.patchValue({
          village: selectVillage
        })
      }
    })
  }

  close() {
    this.modalService.hide()
  }

  submit(e: any, formvalue: any) {
    e.preventDefault()
    if (this.farmerForm.invalid) {
      this.farmerForm.markAllAsTouched();
      return;
    }
    let payload = {
      "farmer_id": 0,
      "farmer_name": formvalue?.name,
      "phone_no": formvalue?.mobile.toString(),
      "address": formvalue?.address,
      "father_name": formvalue?.relationName,
      "relation": formvalue?.relation,
      "village_id": Number(formvalue?.village.value),
      "is_active": this.editData?.is_active !== undefined ? this.editData.is_active : 1,
      "created_by": this.commonService.getUserId(),
    }
    let service = this.farmerService.addFarmer(payload);
    if (this.editData) {
      payload.farmer_id = this.editData.farmer_id;
      service = this.farmerService.updateFarmer(payload);
    }

    service.subscribe((res: any) => {
      if (res?.body?.statusCode === 200) {
        this.NotificationService.showSuccess(res?.body?.message)
        this.bsmodalService.hide();
        this.mapdata.emit();
      } else {
        this.NotificationService.showError(res?.body?.message)
      }
    })
  }
}
