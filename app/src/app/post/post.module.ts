import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { UiModule } from '@kikstart/ui';

import { PostIndexComponent } from './containers/post-index.component';
import { PostComponent } from './components/post.component';
import { PostCommentsComponent } from './components/post-comments.component';
import { PostFormComponent } from './components/post-form.component';
import { PostService } from './post.service';
import { PostAuthorComponent } from './components/post-author.component';
import { PostButtonsComponent } from './components/post-buttons.component';

const routes: Routes = [{ path: '', component: PostIndexComponent }];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes), ModalModule.forRoot()],
  providers: [BsModalService, PostService],
  declarations: [
    PostIndexComponent,
    PostComponent,
    PostCommentsComponent,
    PostFormComponent,
    PostAuthorComponent,
    PostButtonsComponent,
  ],
  exports: [PostAuthorComponent],
  entryComponents: [PostCommentsComponent],
})
export class PostModule {}
