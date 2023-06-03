import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { EventService } from 'src/event/event.service';

@Controller(':eventId/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketService.create(eventId, createTicketDto);
  }

  @Get()
  findAll(@Query('eventId') eventId?: string) {
    if (eventId) return this.ticketService.findAllByEvent(eventId);
    else return this.ticketService.findAll();
  }

  @Get(':ticketId')
  findOne(@Param('ticketId') ticketId: string) {
    return this.ticketService.findOne(+ticketId);
  }

  @Patch(':ticketId')
  update(
    @Param('ticketId') ticketId: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(+ticketId, updateTicketDto);
  }

  @Delete(':ticketId')
  remove(@Param('ticketId') ticketId: string) {
    return this.ticketService.remove(+ticketId);
  }
}
