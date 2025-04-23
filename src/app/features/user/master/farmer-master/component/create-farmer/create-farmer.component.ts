import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerService } from '../../services/farmer.service';
import { formatDate } from '@angular/common';
import { NotificationService } from '../../../../../shared/services/notification.service';

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
  ]

  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private farmerService : FarmerService,
    private NotificationService : NotificationService,
    private bsmodalService: BsModalService,
  ) { }

  ngOnInit() {
    this.setInitialState()
    this.getVillageList()
  }

  setInitialState() {
    this.farmerForm = this.fb.group({
      village: [null, [Validators.required]],
      name: ['', [Validators.required]],
      relation: ['S/O', [Validators.required]],
      relationName: ['', [Validators.required]],
      registration_date: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: [''],
      status: [1 , [Validators.required]]
    })
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
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
      "village_id": Number(formvalue?.village.value),
      "village_name": formvalue?.village.text,
      "registration_date": formatDate(formvalue.registration_date, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      "user_id": 0,
      "farmer_id_expl": 0,
      "phone_no": formvalue?.mobile.toString(),
      "address": formvalue?.address,
      "father_name": formvalue?.relationName,
      "relation": formvalue?.relation,
      "is_active": formvalue?.status,
      "created_by":  this.commonService.getUserId()
    }
    let service = this.farmerService.addFarmer(payload);

    service.subscribe((res:any) => {
      console.log(res);
      if (res?.body?.statusCode === 200) {
        this.NotificationService.showSuccess(res?.body?.actionResponse)
        this.bsmodalService.hide();
        this.mapdata.emit();
      } else {
        this.NotificationService.showError(res?.body?.actionResponse)
      }
    })
  }
}
