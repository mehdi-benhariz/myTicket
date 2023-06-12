import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthService } from './user-auth.service';
import { UserStrategy } from './user.strategy';
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
  providers: [UserService, UserAuthService, UserStrategy],
  exports: [PassportModule, UserAuthService],
})
export class UserModule {}
