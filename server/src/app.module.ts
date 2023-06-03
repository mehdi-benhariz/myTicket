import { Module } from '@nestjs/common';
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
@Module({
  imports: [DatabaseModule, EventModule, TicketModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
