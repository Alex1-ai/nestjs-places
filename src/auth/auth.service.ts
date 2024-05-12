import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpUserInput } from 'src/user/dto/signUpUser.input';
import { SingupResponse } from 'src/user/singupResponse';

@Injectable()
export class AuthService {
    async signup(signUpUserInput: SignUpUserInput) : Promise<SingupResponse>{
       const salt = await bcrypt.genSalt();
       const harshedPassword = await bcrypt.hash(signUpUserInput.password, salt)
       const signUpUserInput = harshedPassword

       return this.
    }
}
