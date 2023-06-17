import { IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  ticketCategoryId: number;
}
