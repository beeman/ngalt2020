import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiModule } from '@kikstart/ui';

import { PostModule } from '../post';
import { ProfileService } from './profile.service';
import { ProfileCardComponent } from './components/profile-card.component'
import { ProfileDetailComponent } from './containers/profile-detail.component';

const routes: Routes = [{ path: ':username', component: ProfileDetailComponent }];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes), PostModule],
  providers: [ProfileService],
  declarations: [ProfileCardComponent, ProfileDetailComponent],
})
export class ProfileModule {}
