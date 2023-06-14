import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CookieStrategy } from './auth/cookie.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserStrategy } from './auth/user.strategy';
import { UserAuthService } from './user-auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'sussybaka',
      global: true,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserAuthService,
    UserStrategy,
    JwtStrategy,
    // CookieStrategy,
  ],
  exports: [PassportModule, UserAuthService, UserService],
})
export class UserModule {}
