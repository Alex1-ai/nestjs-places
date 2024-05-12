import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Place } from 'src/place/entities/place.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Place, (place) => place.user)
  @Field(() => [Place])
  places: Place[];
}
