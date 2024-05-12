import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
