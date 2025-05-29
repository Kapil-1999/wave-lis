import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { DisputedService } from '../../services/disputed.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-crate-dispute',
  standalone: false,
  templateUrl: './crate-dispute.component.html',
  styleUrl: './crate-dispute.component.scss'
})
export class CrateDisputeComponent {
  @Output() mapdata = new EventEmitter();

  label : string = 'Create';
  editData : any;
  disputeForm!: FormGroup;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
  };
  villageList:any;
  khasraList:any;
  disputeType = [
    {id: 'disputed', text : 'Disputed'},
    {id: 'court_case', text : 'Court Case'},

  ]
  constructor(
    private bsmodalService : BsModalService,
    private fb : FormBuilder,
    private commonService : CommonService,
    private disputeService : DisputedService,
    private NotificationService : NotificationService
  ){}

  ngOnInit() {
    this.setInitialForm();
    this.getVillageList()
  }

  setInitialForm() {
    this.disputeForm = this.fb.group({
      disputeType : [null,[Validators.required]],
      remarks : [null,[Validators.required]],
      courtCaseNo : [null],
      village : [null, [Validators.required]],
      khasra : [null, [Validators.required]],
      disputeArea : [0, [Validators.required]],
    })

    if(this.editData) {
      this.disputeForm.patchValue({
        disputeType : this.editData?.disputed_type,
        remarks : this.editData?.disputed_remarks,
        courtCaseNo : this.editData?.court_case_no,
        disputeArea : this.editData?.disputed_area,
      })
    }
  }

  getVillageList() {
    this.commonService.villageList().subscribe((res: any) => {
      this.villageList = res?.body?.data || [];
      if(this.editData) {
        let selectVillage = this.villageList.find((item:any) => item.value == this.editData?.village_id);
        this.disputeForm.get('village')?.setValue(selectVillage);
        this.getKhasraList(selectVillage?.value)
      }
    })
  }

  onChangeVillage(e:any) {
    this.disputeForm.get('khasra')?.reset();
    this.khasraList = [];
   if(Array.isArray(e.value)) {
    return
   } else {
    this.getKhasraList(e.value?.value)
   }
  }

  getKhasraList(id:any) {
    let data = {
      villageId : id
    }
    this.commonService.khasraBasedOnVillage(data).subscribe((res: any) => {      
      this.khasraList = res?.body?.data || [];
      if(this.editData) {
        let selectKhasra = this.khasraList.find((item:any) => item.value == this.editData?.khasra_id);
        this.disputeForm.get('khasra')?.setValue(selectKhasra);
      }
    })
  }

  submit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.disputeForm.invalid) {
      this.disputeForm.markAllAsTouched();
      return;
    }    
    let payload = {
      "disputed_id": 0,
      "disputed_type": formvalue.disputeType,
      "disputed_remarks": formvalue.remarks,
      "court_case_no": formvalue.courtCaseNo ? formvalue.courtCaseNo : null,
      "village_id": formvalue.village?.value ? Number(formvalue.village?.value) : 0,
      "khasra_id": formvalue.khasra?.value? Number(formvalue.khasra?.value) : 0,
      "khasra_no": formvalue.khasra?.value ? formvalue.khasra?.text?.split(' ')[0] : null,
      "disputed_area": formvalue.disputeArea,
      "is_active": 1,
      "created_by": this.commonService.getUserId(),
    }
    let service =  this.disputeService.createDispute(payload);
    if(this.editData) {
      payload.disputed_id = this.editData?.disputed_id;
      service = this.disputeService.updateDisputeDetails(payload);;
    }
    service.subscribe((res:any) => {
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
