import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CurrentUserMiddleware } from 'src/middleware/CurrentUser.middleware';
import { UserModule } from '../user/user.module';
import { EventService } from '../event/event.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [UserModule],
  controllers: [TicketController],
  providers: [TicketService, EventService],
})
export class TicketModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes(':eventId/ticket');
  }
}
