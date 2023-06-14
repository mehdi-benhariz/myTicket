import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthService } from './user-auth.service';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly UserAuthService: UserAuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('loginV2')
  async loginWithCookie(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = await this.UserAuthService.login(loginUserDto);
    res.cookie('access_token', token.accessToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });

    return res.json(token);
  }
  @Post('loginV1')
  async loginWithToken(@Body() loginUserDto: LoginUserDto) {
    return await this.UserAuthService.login(loginUserDto);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.UserAuthService.register(createUserDto);
  }
  // @UseGuards(PassportAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    this.UserAuthService.logout(req, res);
    return res.json({ message: 'logout' });
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(CookieAuthGuard)
  @Post('profile')
  async test() {
    return 'profile';
  }
}
