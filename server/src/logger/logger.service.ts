import { Injectable, Scope } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends PinoLogger {
  public verbose(...args: any[]): void {
    super.trace(args);
  }

  public log(...args: any[]): void {
    console.log('we are in log');
    super.info(args);
  }
}
