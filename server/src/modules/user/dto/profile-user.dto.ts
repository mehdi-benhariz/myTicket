import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ProfileUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
