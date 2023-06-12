import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthService } from './user-auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PassportAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.UserAuthService.login(loginUserDto);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.UserAuthService.register(createUserDto);
  }
  @UseGuards(PassportAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.UserAuthService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async test(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
