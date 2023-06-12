import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: UserAuthService) {
    super({ usernameField: 'email' });
  }
}
