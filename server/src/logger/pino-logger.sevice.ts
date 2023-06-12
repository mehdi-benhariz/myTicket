import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as fs from 'fs';
import pino from 'pino';
import * as path from 'path';

@Injectable()
export class PinoLoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    const logsDir = path.join(__dirname, '..', '..', 'logs');

    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
    const infoFileStream = fs.createWriteStream(
      path.join(logsDir, 'info.log'),
      {
        flags: 'a',
      },
    );
    const errorFileStream = fs.createWriteStream(
      path.join(logsDir, 'error.log'),
      {
        flags: 'a',
      },
    );

    const warningFileStream = fs.createWriteStream(
      path.join(logsDir, 'warning.log'),
      {
        flags: 'a',
      },
    );

    this.logger = pino({}, infoFileStream);
    this.logger.error = pino({}, errorFileStream).error.bind(this.logger);
    this.logger.warn = pino({}, warningFileStream).warn.bind(this.logger);
    // this.logger = pino({
    //   level: 'info',
    //   formatters: {
    //     level: (label: string) => ({ level: label }),
    //   },
    //   base: null,
    //   transports: [
    //     {
    //       level: 'info',
    //       stream: fs.createWriteStream(path.join(logsDir, 'info.log'), {
    //         flags: 'a',
    //       }),
    //     },
    //     {
    //       level: 'error',
    //       stream: fs.createWriteStream(path.join(logsDir, 'error.log'), {
    //         flags: 'a',
    //       }),
    //     },
    //   ],
    // });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string, trace?: string): void {
    this.logger.error(message, trace);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  verbose(message: string): void {
    this.logger.trace(message);
  }
}
