import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { setShowLogin, setToken, setUser } from '../../../../core/app.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm! : FormGroup;
  showPassword :boolean = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private loginService : TokenService,
    private notificationService : NotificationService,
  ) {}

  ngOnInit() {
    this.setInItialForm();
  }

  setInItialForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  closeLogin() {
    this.store.dispatch(setShowLogin({ showLogin: false } ));
  }

  onLogin(e:any, formvalue:any) {
    e.preventDefault();
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    console.log(formvalue);
    let payload = {
      email: formvalue.username,
      password: formvalue.password
    }
    this.loginService.login(payload).subscribe((res:any) => {
      if(res?.body?.statusCode === 200) {
        this.store.dispatch(setToken({ token: res?.body?.data?.token}));
        this.store.dispatch(setUser({user: res?.body?.data}));
        this.notificationService.showSuccess(res?.body?.message);
        this.closeLogin();
      }  else {
        this.notificationService.showError(res?.body?.actionResponse);
      }   
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
