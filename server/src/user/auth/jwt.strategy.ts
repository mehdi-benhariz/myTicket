import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'sussybaka',
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