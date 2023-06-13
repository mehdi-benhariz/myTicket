import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UserModule],

  controllers: [EventController],
  providers: [
    EventService,
    // {
    // provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class EventModule {}
