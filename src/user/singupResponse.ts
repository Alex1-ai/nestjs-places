import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingupResponse {
  @Field()
  email: string;

  @Field()
  username: string;
}
