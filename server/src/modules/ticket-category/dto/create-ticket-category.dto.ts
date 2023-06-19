import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTicketCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  capacity: number;
}
