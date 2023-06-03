import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { EventService } from '../event/event.service';

@Module({
  imports: [EventService],
  controllers: [TicketController ],
  providers: [TicketService]
})
export class TicketModule {}
