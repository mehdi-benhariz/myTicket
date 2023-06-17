import { Transform } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class ReturnTicketDto {
  @IsString()
  id: number;
  @IsDateString()
  date: Date;
  @Transform(({ value }) => value?.username)
  owner: User;

  ticketCategoryId: number;
}
