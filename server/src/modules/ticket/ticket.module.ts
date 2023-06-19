import { Module } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { TicketCategoryService } from '../ticket-category/ticket-category.service';
import { UserModule } from '../user/user.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [UserModule],
  controllers: [TicketController],
  providers: [TicketService, EventService, TicketCategoryService],
})
export class TicketModule {}
