import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class CookieAuthGuard extends AuthGuard('cookie') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // Add your custom logic here to validate the cookie or perform any checks

    return this.validateToken(request.cookies.access_token);
  }
  validateToken(token: string) {
    // Add your custom logic here to validate the token or perform any checks
    return true;
  }
}
