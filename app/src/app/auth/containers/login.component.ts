import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FormHelper } from '@kikstart/ui'
import { filter, map } from 'rxjs/operators'

import { AuthService } from '../auth.service'
import { brand } from '../../app.config'

@Component({
  template: `
    <ui-auth
      [brand]="brand"
      [fields]="fields"
      [form]="form"
      label="Log in"
      (action)="handleAction($event)"
      [links]="[
        { label: 'Log in', path: '/login' },
        { label: 'Register', path: '/register' }
      ]"
    ></ui-auth>
  `,
})
export class LoginComponent implements OnInit {
  public brand = brand
  form = new FormGroup({})
  fields: FormHelper[] = [
    FormHelper.email('email', {
      label: 'Email',
      required: true,
    }),
    FormHelper.password('password', {
      label: 'Password',
      required: true,
    }),
  ]

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        map(params => params.token),
        filter(token => !!token),
      )
      .subscribe(() => this.router.navigate(['/']))
  }

  async handleAction({ payload }) {
    this.form.disable()
    return this.auth.login(payload).subscribe(
      () => {
        return this.router.navigate(['/'])
      },
      () => this.form.enable(),
      () => this.form.enable(),
    )
  }
}
