import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';
import { PinoLoggerService } from './pino-logger.sevice';

@Global()
@Module({
  imports: [
    PinoModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { logLevel, environment } = {
          logLevel: 'debug',
          environment: 'dev',
        };
        return {
          pinoHttp: {
            autoLogging: true,
            formatters: {
              level: (label) => {
                return { level: label };
              },
            },
            level: logLevel || 'debug',
            transport:
              environment === 'dev' ? { target: 'pino-pretty' } : undefined,
          },
        };
      },
    }),
  ],
  providers: [LoggerService, PinoLoggerService],
  exports: [LoggerService, PinoLoggerService],
})
export class LoggerModule {}
