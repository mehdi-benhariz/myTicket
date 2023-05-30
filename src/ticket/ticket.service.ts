import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  findAllTicketsForEvent(eventId: string) {
    throw new Error('Method not implemented.');
  }

}
