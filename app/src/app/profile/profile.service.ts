import { Injectable } from '@angular/core'
import { BsModalService } from 'ngx-bootstrap'
import { map } from 'rxjs/operators'

import { AuthService } from 'src/app/auth'
import { ApolloAngularSDK, Profile } from 'src/sdk'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private auth: AuthService, private sdk: ApolloAngularSDK, private modalService: BsModalService) {}

  profiles() {
    return this.sdk.profiles().pipe(map(result => result.data.profiles as Profile[]))
  }

  profile(username: string) {
    return this.sdk.profile({ username }).pipe(map(result => result.data.profile as Profile))
  }
}
