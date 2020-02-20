import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  template: `
    <ui-auth label="Log out..."></ui-auth>
  `,
})
export class LogoutComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.logout()
      .subscribe(() => this.router.navigate(['/login']));
  }

}
