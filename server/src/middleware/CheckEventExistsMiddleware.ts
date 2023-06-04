import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EventService } from '../event/event.service';

@Injectable()
export class CheckEventExistsMiddleware implements NestMiddleware {
  constructor(private readonly eventService: EventService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.eventId;
    await this.eventService.findOne(parseInt(eventId));
    next();
  }
}
