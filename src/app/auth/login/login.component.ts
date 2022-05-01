import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    private ahs: AuthService,
    private router: Router,
    private ns: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  async submitLogin(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    await this.ahs.login(this.form.value);
  }

}
