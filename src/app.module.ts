import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket/entities/ticket.entity';
import { Event } from './event/entities/event.entity';

@Module({
  // imports: [EventModule, TicketModule, DatabaseModule],
  imports: [
    EventModule,
    TicketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mehdi',
      password: 'M1e2h3d4i5',
      database: 'myticket_db',
      // entities: [Event, Ticket],
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
