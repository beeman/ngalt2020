import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup } from '@angular/forms';
import { FormHelper } from '@kikstart/ui';


@Component({
  selector: 'auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  links = [
    { route: '/login', title: 'Log in' },
    { route: '/register', title: 'Register' },
  ];
  name: string;

  @Input() title = 'GraphQL with Angular';
  @Input() message: string;
  @Input() label: string;
  @Output() action = new EventEmitter();

  @Input() form = new FormGroup({});
  @Input() model = {};
  @Input() fields: FormHelper[] = [];
  @Input() navigation = true;

  constructor(public service: AuthService) {}
}

