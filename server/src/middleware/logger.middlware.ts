import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PinoLoggerService } from '../logger/pino-logger.sevice';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, ip } = req;

    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;

      this.logger.log(
        `${method} ${url} ${statusCode} ${statusMessage} - ${ip} - ${responseTime}ms`,
      );
    });

    next();
  }
}
