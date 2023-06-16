import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  //! change it later to .env , there was a problem with it
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mehdi',
  password: 'M1e2h3d4i5',
  database: 'myticket_db',
  entities: [Event, Ticket, User],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
};
