import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserAuthService } from './user-auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
  @Post('login')
  async loginWithCookie(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = await this.userAuthService.login(loginUserDto);
    res.cookie('access_token', token?.accessToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });

    return res.json(token);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userAuthService.register(registerUserDto);
  }
  // @UseGuards(PassportAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    this.userAuthService.logout(req, res);
    return res.json({ message: 'logout' });
  }
}
