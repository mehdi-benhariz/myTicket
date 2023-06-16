import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserAuthService } from 'src/modules/user/auth/user-auth.service';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: UserAuthService) {
    super({ usernameField: 'email' });
  }
}
