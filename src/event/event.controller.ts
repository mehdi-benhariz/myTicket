import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { TicketService } from '../ticket/ticket.service';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
  @Get(':eventId/tickets')
  findAllTicketsForEvent(@Param('eventId') eventId: string) {
    // Logic to fetch all tickets for a specific event
    return this.ticketService.findAllTicketsForEvent(eventId);
  }
}
