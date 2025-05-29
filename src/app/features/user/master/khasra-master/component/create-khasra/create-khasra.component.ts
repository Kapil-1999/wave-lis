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
    displayKey: "text",
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
  ) { }

  ngOnInit() {
    this.setInitialValue();
    this.getVillageList();

  }

  setInitialValue() {
    this.khasraForm = this.fb.group({
      village: [null, [Validators.required]],
      khasra_no: [null, [Validators.required]],
      total_area: [0, [Validators.required, Validators.min(1)]],
      acquisition_area: [0],
      project_area: [0],
      notified_area: [0],
      lmc_area: [0],
    })

    if (this.editData) {
      this.label = 'Update';
      this.khasraForm.patchValue({
        khasra_no: this.editData.khasra_no,
        total_area: this.editData.total_area,
        acquisition_area: this.editData.acquisition_area,
        project_area: this.editData.project_area,
        notified_area: this.editData.notified_area,
        lmc_area: this.editData.lmc_area,
      })
    }
  }


  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {      
      this.villageList = res?.body?.data || [];
      if(this.editData) {
        let selectVillage = this.villageList.find((val:any) => val?.value == this.editData?.village_id);
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
      "village_id": Number(formvalue?.village.value),
      "is_active": this.editData?.is_active !== undefined ? this.editData.is_active : 1,
      "created_by": this.commonService.getUserId(),
      "notified_area": formvalue.notified_area
    }

    let service = this.khasraService.addKhasra(payload);
    if (this.editData) {
      payload.khasra_id = this.editData.khasra_id;
      service = this.khasraService.updateKhasra(payload);
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

  close() {
    this.bsmodalService.hide();
  }
}
