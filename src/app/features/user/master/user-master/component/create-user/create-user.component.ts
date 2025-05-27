import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  @Output() mapdata = new EventEmitter();

  userForm!: FormGroup;
  showPassword: boolean = false;
  label :String = 'Create';
   verify = [
    { value: 'Yes', id: 1 },
    { value: 'No', id: 0 },
  ];
  roleData: any;
  photoBase64: string = '';
  editData: any;
  config = {
    displayKey: "role_name",
    search: true,
    height: '300px',
    placeholder : 'Select Phase',
  };

  constructor(
    private bsModalService : BsModalService,
    private fb : FormBuilder,
    private commonService : CommonService,
    private userService : UserService,
    private NotificationService : NotificationService
  ) {};

  ngOnInit() {
    this.getRoleList();
    this.setInitialForm();
  }

  setInitialForm() {
    this.userForm = this.fb.group({
      name : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      role : [null,[Validators.required]],
      phone : [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      loginId : [null , [Validators.required]],
      password : [null , [Validators.required]],
      acc_valid_to : [null, [Validators.required]],
      img_path : [null ],
      address : [null],
    })
  }

  getRoleList() {
    this.commonService.roleList().subscribe((res:any) => {
      console.log(res);
      this.roleData = res?.body?.data || [];
    })
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageValue = reader.result as string
        this.photoBase64 = imageValue.split(',')[1];
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  }

  submit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    let payload = {
        "user_id": 0,
        "dept_id": 0,
        "role_id": formvalue.role?.role_id,
        "full_name": formvalue.name,
        "contact_no": formvalue.phone.toString(),
        "email_id": formvalue.email,
        "cur_address": formvalue.address,
        "login_id": formvalue.loginId,
        "login_pass": formvalue.password,
        "parent_id": 0,
        "img_path": this.photoBase64,
        "acc_valid_to": formvalue.acc_valid_to,
        "remarks": null,
        "is_active": this.editData?.is_active !== undefined ? this.editData.is_active : 1,
        "created_by": this.commonService.getUserId(),
      }
      this.userService.addUser(payload).subscribe((res:any) => {
        console.log(res);
        if (res?.body?.statusCode === 200) {
          this.NotificationService.showSuccess(res?.body?.message)
          this.bsModalService.hide();
          this.mapdata.emit();
        } else {
          this.NotificationService.showError(res?.body?.message)
        }
      });   
  }

  close() {
    this.bsModalService.hide();
  }

}
