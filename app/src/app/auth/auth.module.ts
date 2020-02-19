import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@kikstart/ui';

import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginComponent } from './containers/login.component';
import { LogoutComponent } from './containers/logout.component';
import { ProfileComponent } from './containers/profile.component';
import { RegisterComponent } from './containers/register.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
    ]
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  declarations: [AuthPageComponent, LoginComponent, RegisterComponent, ProfileComponent, LogoutComponent]
})
export class AuthModule {}
