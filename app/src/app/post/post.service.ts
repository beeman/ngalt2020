import { Injectable } from '@angular/core'
import { BsModalService } from 'ngx-bootstrap'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from 'src/app/auth'
import { ApolloAngularSDK, Comment, Post } from 'src/sdk'
import { PostActions } from './actions/post.actions'

import { PostModalComponent } from './components/post-modal.component'

const formatPost = (post: Post) => ({
  ...post,
  author: {
    ...post.author,
    path: '/profiles/' + post.author.username,
  },
  buttons: [
    {
      icon: 'fa fa-fw fa-comment',
      label: `${post.commentCount} Comments`,
      payload: { id: post.id },
      type: PostActions.SHOW_COMMENTS,
    },
  ],
})

const formatPosts = (posts: Post[]) => posts.map(formatPost)

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private auth: AuthService,
    private sdk: ApolloAngularSDK,
    private modalService: BsModalService,
  ) {}

  posts() {
    return this.sdk.posts().pipe(
      map(result => result.data.posts),
      map(formatPosts),
    )
  }

  post(id: string) {
    return this.sdk.post({ id }).pipe(
      map(result => result.data.post),
      map(formatPost),
    )
  }

  createPost({ text }) {
    return this.sdk.createPost({ data: { text } })
  }

  comments(postId: string) {
    return this.sdk.comments({ postId }).pipe(map(result => result.data.comments as Comment[]))
  }

  createComment(postId, { text }) {
    return this.sdk.createComment({ data: { postId, text } })
  }

  openComments({
    title,
    handler,
    post,
    comments,
  }: {
    handler?: (data) => Observable<any>
    title?: string
    post?: Post
    comments?: Comment[]
  }) {
    const fetcher = id => this.comments(id)
    const showPost = { ...post }
    // @ts-ignore
    delete showPost.buttons
    this.modalService.show(PostModalComponent, {
      initialState: {
        title,
        handler,
        fetcher,
        author$: this.auth.user$,
        post: showPost,
        // comments: ,
      },
    })
  }
}
