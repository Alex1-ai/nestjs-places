import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreatePlaceInput {
  @IsNotEmpty()
  @Field()
  @Length(3, 200)
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @Field()
  open_hours: string;
}
