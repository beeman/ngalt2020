import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@kikstart/ui';

import { AppLayoutComponent } from './core/containers/app-layout.component';
import { AppHeaderComponent } from './core/components/app-header.component';
import { NotFoundComponent } from './core/containers/not-found.component';
import { AppComponent } from './app.component';
import { AppGraphQLModule } from './app.graphql.module';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'posts', },
      {
        path: 'posts',
        loadChildren: () =>
          import('./post/post.module').then(m => m.PostModule)
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then(m => m.AuthModule)
      },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    UiModule,
    AppGraphQLModule,
  ],
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    NotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
