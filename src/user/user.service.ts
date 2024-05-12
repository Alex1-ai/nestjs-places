import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignUpUserInput } from './dto/signUpUser.input';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  createUser(signUpUserInput: SignUpUserInput){
    const { username, email, password } = signUpUserInput;

    const newUser = this.userRepository.create({
      username,
      email,
      password
    })
    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }

  }
}
