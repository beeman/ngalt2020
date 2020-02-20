import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UiModule } from '@kikstart/ui'

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { PostModalComponent } from './components/post-modal.component'
import { PostIndexComponent } from './containers/post-index.component'
import { PostService } from './post.service'

const routes: Routes = [{ path: '', component: PostIndexComponent }];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes), ModalModule.forRoot()],
  providers: [BsModalService, PostService],
  declarations: [
    PostIndexComponent,
    PostModalComponent,
  ],
  entryComponents: [PostModalComponent],
})
export class PostModule {}
