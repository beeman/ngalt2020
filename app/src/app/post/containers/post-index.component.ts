import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthService } from 'src/app/auth'

import { Post, User } from 'src/sdk'
import { PostActions } from '../actions/post.actions'

import { PostService } from '../post.service'

@Component({
  template: `
    <div class="container pt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div class="mb-3 list-group-item" *ngIf="author$ | async as author">
            <ui-comment-form
              [model]="post"
              [reset$]="refresh$"
              [avatar]="author?.avatar"
              (action)="createPost($event)"
            ></ui-comment-form>
          </div>
          <ng-container *ngIf="feed$ | async as feed; else loading">
            <div class="mb-3 list-group-item" *ngFor="let post of feed">
              <ui-comment [comment]="post" (action)="handleAction($event)"></ui-comment>
            </div>
          </ng-container>
          <ng-template #loading>
            <ui-loading [loading]="true"></ui-loading>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class PostIndexComponent implements OnInit {
  public author$: Observable<User>
  public feed$: Observable<Post[]>
  public post: { text: string } = { text: null }
  public _refresh = new BehaviorSubject(true)
  public refresh$ = this._refresh.asObservable()

  constructor(public auth: AuthService, public service: PostService) {
    this.author$ = this.auth.user$
  }

  private refresh() {
    this._refresh.next(true)
  }

  ngOnInit() {
    this.feed$ = this.refresh$.pipe(switchMap(() => this.service.posts()))
  }

  createPost({ payload }) {
    return this.service.createPost(payload).subscribe(
      () => this.refresh(),
      err => console.log('Something went wrong!', err),
    )
  }

  handleAction({ type, payload }: { type: string; payload?: any }) {
    if (type === PostActions.SHOW_COMMENTS) {
      const handler = data => this.service.createComment(payload.id, data)
      return this.service.openComments({ title: 'HE', handler, post: payload })
    }
    console.log('Unhandled type', { type, payload })
    return { type, payload }
  }
}
