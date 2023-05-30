import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Ticket } from '../ticket/entities/ticket.entity';
import { Event } from '../event/entities/event.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mehdi',
  password: 'M1e2h3d4i5',
  database: 'myticket_db',
  entities: [Event, Ticket],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,

};
