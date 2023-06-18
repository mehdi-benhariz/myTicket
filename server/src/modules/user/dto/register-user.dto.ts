import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class RegisterUserDto extends PickType(CreateUserDto, [
  'username',
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  username: string;
}
