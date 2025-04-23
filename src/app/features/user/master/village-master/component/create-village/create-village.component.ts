import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { VilageService } from '../../service/vilage.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-village',
  standalone: false,
  templateUrl: './create-village.component.html',
  styleUrl: './create-village.component.scss'
})
export class CreateVillageComponent {
  @Output() mapdata = new EventEmitter()
  label: string = "Create";
  villageForm!: FormGroup;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder : 'Select Phase',
  };
  phaseList: any = [
    { text: 'Phase 1', value: 'Phase1' },
    { text: 'Phase 2', value: 'Phase2' },
    { text: 'All', value: 'All' }
  ];
  verify = [
    { value: 'Yes', id: 1 },
    { value: 'No', id: 0 },
  ];

  editData: any;

  constructor(
    private bsmodalService: BsModalService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private villageService: VilageService,
    private NotificationService: NotificationService
  ) { }


  ngOnInit() {        
    this.setInitialTable();
  }

  setInitialTable() {
    if(this.editData) {
      this.label = "Update";
      this.villageForm = this.fb.group({
        name: [this.editData.village_name, [Validators.required]],
        phase: [null, [Validators.required]],
        shape_len: [this.editData.shape_lenght],
        shape_area: [this.editData.shape_area],
        cent_loc: [this.editData.center_loc],
        vill_url: [this.editData.village_url],
        isVerify: [this.editData.is_verified, [Validators.required]],
      });

      this.villageForm.patchValue({
        phase: this.phaseList.find((data: any) => data.value == this.editData.phase)
      })

    } else {
      this.villageForm = this.fb.group({
        name: ['', [Validators.required]],
        phase: [null, [Validators.required]],
        shape_len: [0],
        shape_area: [0],
        cent_loc: [''],
        vill_url: [''],
        isVerify: [0, [Validators.required]],
      });
    }
  }


  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data;
    } else {
      return '';
    }
  }

  submit(formvalue: any) {
    if (this.villageForm.invalid) {
      this.villageForm.markAllAsTouched();
      return;
    }

    let phaseValue = this.getSelectedValues(formvalue?.phase);

    let payload = {
      "village_id": 0,
      "village_code": "",
      "village_name": formvalue.name,
      "shape_lenght": formvalue.shape_len,
      "shape_area": formvalue.shape_area,
      "company_id": 0,
      "company_name": "",
      "phase": phaseValue.value,
      "center_loc": formvalue.cent_loc,
      "village_url": formvalue.vill_url,
      "is_verified": formvalue.isVerify,
      "is_active": 1,
      "created_by": this.commonService.getUserId(),
      "total_count": 0
    }
    let service = this.villageService.addVillage(payload);
    if(this.editData) {
      payload.village_id = this.editData.village_id;
      service = this.villageService.updateVillage(payload)
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
    this.bsmodalService.hide()
  }
}
