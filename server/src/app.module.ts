import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/entities/ticket.entity';
import { Event } from './event/entities/event.entity';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CheckEventExistsMiddleware } from './middleware/CheckEventExistsMiddleware';
import path from 'path';
@Module({
  imports: [DatabaseModule, EventModule, TicketModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CheckEventExistsMiddleware)
  //     .forRoutes
  //     // Add more routes as needed
  //     ( );
  // }
}
