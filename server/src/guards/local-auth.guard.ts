import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportAuthGuard
  extends AuthGuard('local')
  implements CanActivate
{
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super();
  }
  //add a function to get user by token from database

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async validateRequest(request: any): Promise<boolean> {
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'sussybaka',
      });
      const user = await this.userService.findByEmail(payload['email']);
      if (!user) throw new UnauthorizedException('User not found');
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }
}
