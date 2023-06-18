import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/user/auth/strategies/jwt.strategy';
import { UserStrategy } from 'src/modules/user/auth/strategies/user.strategy';
import { AuthController } from './auth/auth.controller';
import { UserAuthService } from './auth/user-auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      //TODO: change secret to use env variable
      secret: 'sussybaka',
      global: true,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserAuthService,
    UserService,
    UserStrategy,
    JwtStrategy,
    // CookieStrategy,
  ],
  exports: [PassportModule, UserAuthService, UserService],
})
export class UserModule {}
