import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelper } from '@kikstart/ui';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  template: `
    <auth-page
      [form]="form"
      [fields]="fields"
      label="Register"
      (action)="handleAction($event)"
    ></auth-page>
  `,
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({});
  fields: FormHelper[] = [
    FormHelper.input(
      'username',
      {
        label: 'Username',
        required: true,
      },
    ),
    FormHelper.email(
      'email',
      {
        label: 'Email',
        required: true,
      },
    ),
    FormHelper.password(
      'password',
      {
        label: 'Password',
        required: true,
      },
    ),
    FormHelper.input(
      'name',
      {
        label: 'Name',
        required: true,
      },
    ),
  ];

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
  }

  async handleAction({ type, payload }) {
    this.form.disable();
    return this.auth
      .register(payload)
      .subscribe(
        res => {
          console.log('YAY USER REGISTERED', res);
          return this.router.navigate(['/']);
        },
        err => {
          console.log('error submitting form', err);
          this.form.enable();
        })
  }
}
