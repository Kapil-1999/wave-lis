import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { KhasraService } from '../../service/khasra.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { VilageService } from '../../../village-master/service/vilage.service';

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
    displayKey: "village_name",
    search: true,
    height: '300px',
  }
  villageList: any;
  status = [
    { value: 'Active', id: 1 },
    { value: 'Inactive', id: 0 },
  ];
  editData: any;

  constructor(
    private bsmodalService: BsModalService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private khasraService: KhasraService,
    private NotificationService: NotificationService,
    private villageService: VilageService
  ) { }

  ngOnInit() {
    this.setInitialValue();
    this.getVillageList();

  }

  setInitialValue() {
    this.khasraForm = this.fb.group({
      village: [null, [Validators.required]],
      khasra_no: ['', [Validators.required]],
      registration_date: ['', [Validators.required]],
      total_area: [0, [Validators.required, Validators.min(1)]],
      acquisition_area: [0],
      project_area: [0],
      notified_area: [0],
      lmc_area: [0],
      status: [1, [Validators.required]]
    })

    if (this.editData) {
      this.label = 'Update';
      const registrationDate = this.commonService.getLocalDateString(this.editData.created_on);
      this.khasraForm.patchValue({
        khasra_no: this.editData.khasra_no,
        registration_date: registrationDate,
        total_area: this.editData.total_area,
        acquisition_area: this.editData.acquisition_area,
        project_area: this.editData.project_area,
        notified_area: this.editData.notified_area,
        lmc_area: this.editData.lmc_area,
        status: this.editData.is_active
      })
    }
  }


  getVillageList() {
    const page = {
      pageNo: 1,
      pageSize: 500,
    };
    this.villageService.villageData(page).subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if(this.editData) {
        let selectVillage = this.villageList.find((val:any) => val?.village_id == this.editData?.village_id);
        this.khasraForm.patchValue({
          village : selectVillage
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

    let payload = {
      "khasra_id": 0,
      "khasra_no": formvalue.khasra_no,
      "total_area": formvalue.total_area,
      "acquisition_area" : formvalue?.acquisition_area,
      "project_area": formvalue.project_area,
      "lmc_area": formvalue.lmc_area,
      "village_id": Number(formvalue?.village.village_id),
      "is_active": formvalue.status,
      "created_by": this.commonService.getUserId(),
      "village_name": formvalue?.village.village_name,
      "village_code": formvalue?.village.village_code,
      "notified_area": formvalue.notified_area,
      "created_on": new Date(formvalue.registration_date).toISOString(),
      "total_count": 0,

    }

    let service = this.khasraService.addKhasra(payload);
    if (this.editData) {
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
