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
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'mehdi',
    //   password: 'M1e2h3d4i5',
    //   database: 'myticket_db',
    //   entities: [Event, Ticket],
    //   // entities: [__dirname + '/../**/*.entity.js'],
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   // logging: true,
    // }),
    DatabaseModule,
    EventModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
