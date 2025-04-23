import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { KhasraService } from '../../service/khasra.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-khasra',
  standalone: false,
  templateUrl: './create-khasra.component.html',
  styleUrl: './create-khasra.component.scss'
})
export class CreateKhasraComponent {
  @Output() mapdata = new EventEmitter();
  label: string = 'Create';
  khasraForm!: FormGroup;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
  }
  villageList: any;
  status = [
    { value: 'Active', id: 1 },
    { value: 'Inactive', id: 0 },
  ];
  editData:any;

  constructor(
    private bsmodalService: BsModalService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private khasraService : KhasraService,
    private NotificationService : NotificationService
  ) { }

  ngOnInit() {
    this.setInitialValue();
    this.getVillageList();
    
  }

  setInitialValue() {
    this.khasraForm = this.fb.group({
      village: [null, [Validators.required]],
      khasra_no: ['', [Validators.required]],
      khata_no: ['', [Validators.required]],
      registration_date: ['', [Validators.required]],
      total_area: ['', [Validators.required]],
      project_area: ['', [Validators.required]],
      notified_area: ['', [Validators.required]],
      lmc_area: ['', [Validators.required]],
      status: [1, [Validators.required]]
    })

    if(this.editData){
      this.label = 'Edit';
      const registrationDate = this.commonService.getLocalDateString(this.editData.registration_date);
      this.khasraForm.patchValue({
        khasra_no : this.editData.khasra_no,
        khata_no : this.editData.khata_no,
        registration_date : registrationDate ,
        total_area : this.editData.total_area,
        project_area : this.editData.project_area,
        notified_area : this.editData.notified_area,
        lmc_area : this.editData.lmc_area,
        status : this.editData.is_active
      })
    }
  }


  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.result || [];
      if(this.editData){
        console.log(this.editData);
        
        this.villageList.map((item:any) => {
          if(item.value == this.editData.village_id){
            this.khasraForm.patchValue({
              village : item
            })
          }
        })
      }
    })
  }

  submit(e: any, formvalue: any) {
    e.preventDefault();
    if (this.khasraForm.invalid) {
      this.khasraForm.markAllAsTouched();
      return;
    }
    console.log(this.khasraForm.value);
    let payload = {
      "khasra_id": 0,
      "khasra_no": formvalue.khasra_no,
      "khata_no": formvalue.khata_no,
      "village_id": Number(formvalue?.village.value),
      "village_name": formvalue?.village.text,
      "registration_date": new Date(formvalue.registration_date).toISOString(),
      "total_area": formvalue.total_area,
      "project_area": formvalue.project_area,
      "notified_area": formvalue.notified_area,
      "lmc_area": formvalue.lmc_area,
      "user_id": 0,
      "is_active": formvalue.status,
      "created_by": this.commonService.getUserId(),
    }
    let service = this.khasraService.addKhasra(payload);
    if(this.editData){
      payload.khasra_id = this.editData.khasra_id;
      service = this.khasraService.updateKhasra(payload);
    }
    service.subscribe((res: any) => {      
      if (res?.body?.statusCode === 200) {
        this.NotificationService.showSuccess(res?.body?.actionResponse)
        this.bsmodalService.hide();
        this.mapdata.emit();
      } else {
        this.NotificationService.showError(res?.body?.actionResponse)
      }
    })    
  }

  close() {
    this.bsmodalService.hide();
  }
}
