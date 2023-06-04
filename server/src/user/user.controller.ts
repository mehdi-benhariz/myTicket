import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthService } from './user-auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { log } from 'console';
import { LoginUserDto } from './dto/login-user.dto';

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
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(req) {
    return this.UserAuthService.logout(req.user);
  }
}
