import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middleware/logger.middlware';
import { EventModule } from './modules/event/event.module';
import { TicketCategoryModule } from './modules/ticket-category/ticket-category.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './startup/config.module';
import { CurrentUserMiddleware } from './middleware/CurrentUser.middleware';
@Module({
  imports: [
    EventModule,
    TicketModule,
    UserModule,
    TicketCategoryModule,
    LoggerModule,
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(CurrentUserMiddleware)
      .forRoutes('*');
  }
}
