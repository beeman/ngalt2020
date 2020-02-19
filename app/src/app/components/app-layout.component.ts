import { Component, OnInit } from '@angular/core'
import { UiBrand, UiLink } from '@kikstart/ui'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { AuthService } from 'src/app/auth'
import { User } from 'src/sdk'

@Component({
  template: `
    <app-header [links]="topLinks" [user]="user$ | async" [userLinks]="userLinks" [brand]="brand"></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppLayoutComponent implements OnInit {
  public brand: UiBrand = {
    logo: '/assets/logo.png',
    name: 'GraphQL',
    product: 'with Angular',
  }

  public topLinks = [{ path: '/posts', label: 'Posts', icon: 'fa fa-home' }]
  public loginLink = { divider: false, path: '/login', label: 'Log in', icon: 'fa fa-sign-in' }
  public userLinks: UiLink[] = [this.loginLink]
  public user$: Observable<User>

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$.pipe(
      tap(res => {
        if (res) {
          this.userLinks = [
            { path: '/profile', label: 'Profile', icon: 'fa fa-user' },
            { path: '/logout', label: 'Log out', icon: 'fa fa-sign-out' },
          ]
        } else {
          this.userLinks = [this.loginLink]
        }
      }),
    )
  }
}
