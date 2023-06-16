import { ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { UserAuthService } from '../user-auth.service';
import { Request } from 'express';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private readonly authService: UserAuthService) {
    super({
      cookieName: 'access_token', // Specify the name of your cookie
      signed: true, // Set to true if the cookie is signed
      jwtFromRequest: ExtractJwt.fromExtractors([
        CookieStrategy.extractJWTFromCookie,
      ]),
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token)
      return req.cookies.access_token;
    return null;
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
