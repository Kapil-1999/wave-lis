import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { IMG_URL } from '../../../../../shared/constant/menu';

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
  photoBase64:any = null ;
  editData: any;
  config = {
    displayKey: "role_name",
    search: true,
    height: '300px',
    placeholder : 'Select Phase',
  };
  imgeUrl = IMG_URL;
  imagePath: any;

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
      password : ['123'],
      acc_valid_to : [null, [Validators.required]],
      img_base64_str : [null],
      address : [null],
    });

    if (this.editData) {
      this.label = 'Update';
      this.userForm.patchValue({
        name : this.editData?.full_name,
        email : this.editData?.email_id,
        phone : this.editData?.contact_no,
        loginId : this.editData?.login_id,
        password : this.editData?.login_pass,
        acc_valid_to : this.editData?.acc_valid_to,
        address : this.editData?.cur_address,
        img_base64_str : null,
      });
      this.imagePath = this.editData?.img_path;
    }
  }

  getImageUrl(path: string): string {
    return path ? `${this.imgeUrl}${path.replace(/\\/g, '/')}` : '';
  }

  getRoleList() {
    this.commonService.roleList().subscribe((res:any) => {
      this.roleData = res?.body?.data || [];
      if (this.editData) {
        let selectedRole = this.roleData.find((item:any) => item.role_id === this.editData?.role_id);
        this.userForm.patchValue({
          role : selectedRole
        })
      }
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
        "img_path": this.editData?.img_path && !this.photoBase64 ? this.editData?.img_path : null,
        "img_base64_str": this.photoBase64,
        "acc_valid_to": formvalue.acc_valid_to,
        "remarks": null,
        "is_active": this.editData?.is_active !== undefined ? this.editData.is_active : 1,
        "created_by": this.commonService.getUserId(),
      }
      let service = this.userService.addUser(payload);
      if(this.editData) {
        payload.user_id = this.editData?.user_id;
        service = this.userService.updateUser(payload);
      }

      service.subscribe((res:any) => {
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
