import { PartialType } from '@nestjs/swagger';
import { CreateTicketCategoryDto } from './create-ticket-category.dto';
import { IsOptional } from 'class-validator';

export class UpdateTicketCategoryDto extends PartialType(
  CreateTicketCategoryDto,
) {
  @IsOptional()
  name: string;

  @IsOptional()
  eventId: number;

  @IsOptional()
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  capacity: number;
}
