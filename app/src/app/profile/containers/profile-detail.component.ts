import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { ProfileService } from '../profile.service'
import { Observable } from 'rxjs'
import { Profile } from 'src/sdk'

@Component({
  template: `
    <div class="container my-5">
      <ng-container *ngIf="profile$ | async as profile; else loading">
        <app-profile-card
          [avatar]="profile.avatar"
          [username]="profile.username"
          [name]="profile.name"
          [bio]="'Bio Placeholder'"
          [location]="'Location Placeholder'"
        >
        </app-profile-card>
      </ng-container>
      <ng-template #loading>
        <ui-loading [loading]="true"></ui-loading>
      </ng-template>
    </div>
  `,
})
export class ProfileDetailComponent implements OnInit {
  public profile$: Observable<Profile>

  constructor(private route: ActivatedRoute, private service: ProfileService) {}

  ngOnInit() {
    this.profile$ = this.route.params.pipe(
      map(params => params.username),
      switchMap(username => this.service.profile(username)),
    )
  }
}
