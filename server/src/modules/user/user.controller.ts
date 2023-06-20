import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/decorators/roles';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomParseIntPipe } from 'src/pipes/parseInt.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id', new CustomParseIntPipe()) id: string) {
    return this.userService.findOne(+id);
  }
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id', new CustomParseIntPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', new CustomParseIntPipe()) id: string) {
    return this.userService.remove(+id);
  }

  @Roles(Role.Admin, Role.Manager, Role.Costumer)
  @Post('profile')
  async test(@Req() req: Request) {
    const userProfile = await this.userService.findOne(req.locals.user.id, [
      'tickets',
    ]);
    return userProfile;
  }
}
