import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { UserService } from '../modules/user/user.service';
import { User } from '../modules/user/entities/user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      locals: {
        user?: User;
      };
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token = this.extractTokenFromHeader(req);

    if (!token) token = req.cookies['access_token'];
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'sussybaka',
      });
      const user = await this.userService.findByEmail(payload['email']);
      if (!user) throw new UnauthorizedException('User not found');
      // * Locals will allow us to access the user in the guards and other middlwares
      req.locals = {};
      req.locals.user = user;
    } catch (err) {
      throw new UnauthorizedException();
    }

    next();
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
