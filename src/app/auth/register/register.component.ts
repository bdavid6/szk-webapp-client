import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: [null],
    password: [null],
    name: [null],
    e_mail: [null],
  });

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get e_mail(): AbstractControl {
    return this.form.get('e_mail') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    private ahs: AuthService,
    private ns: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  async submitRegister(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      await this.ahs.register(this.form.value);

    } else {
      return;
    }
  }

}
