import { Field, ObjectType } from 'type-graphql';
import { Role } from './role';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field()
  email: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  // @Field({ nullable: true })
  // location?: string;

  // @Field({ nullable: true })
  // bio?: string;

  @Field(type => Role, { nullable: true })
  role: Role;

  password?: string;
}
