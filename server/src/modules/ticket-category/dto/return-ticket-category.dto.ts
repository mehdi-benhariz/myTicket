import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateTicketCategoryDto } from './create-ticket-category.dto';
import { IsArray } from 'class-validator';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

export class ReturnTicketCategoryDto extends PartialType(
  CreateTicketCategoryDto,
) {
  @IsArray()
  tickets: Ticket[];
  @Expose()
  get availableTickets(): number {
    return this.capacity - this.tickets.length;
  }
}
