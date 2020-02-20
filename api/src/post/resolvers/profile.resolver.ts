import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { Post } from '..'

import { Profile } from '../models/profile'
import { ProfileService } from '../services/profile.service'

@Resolver(of => Profile)
export class ProfileResolver {
  constructor(private service: ProfileService) {}

  @Query(returns => [Profile], { nullable: true })
  profiles() {
    return this.service.profiles();
  }

  @Query(returns => Profile, { nullable: true })
  profile(@Args('username') username: string) {
    return this.service.profile({ username });
  }

  @ResolveProperty('posts', type => [Post], { nullable: true })
  posts(@Parent() { id }: Profile) {
    return this.service.profilePosts({ id });
  }
}
