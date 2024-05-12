import { Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpUserInput {
  @Field()
  @IsString()
  @Length(4, 30)
  username: string;

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(8, 50)
  password: string;
}
