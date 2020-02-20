import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  profiles() {
    return this.prisma.client.users({
      orderBy: 'created_ASC',
    });
  }

  profile({ username }) {
    return this.prisma.client.user({ username });
  }

  profilePosts({ id }) {
    return this.prisma.client.user({ id }).posts();
  }
}
