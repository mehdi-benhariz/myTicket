import { IsNumber } from 'class-validator';

export class CreateTicketDto {
  // @IsNumber()
  // eventId: number;
  @IsNumber()
  price: number;
  // @IsNumber()
  // userId: number;
}
