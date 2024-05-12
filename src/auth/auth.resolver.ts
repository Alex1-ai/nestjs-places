import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpUserInput } from 'src/user/dto/signUpUser.input';
import { SingupResponse } from 'src/user/singupResponse';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => SingupResponse)
  async signup(
    @Args('signupUserInput') signupUserInput: SignUpUserInput,
  ): Promise<SingupResponse> {
    return this.authService.signup(signupUserInput);
  }
}
