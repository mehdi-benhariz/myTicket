import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserMiddleware } from 'src/middleware/CurrentUser.middleware';
import { UserModule } from '../user/user.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UserModule],

  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('event');
  }
}
