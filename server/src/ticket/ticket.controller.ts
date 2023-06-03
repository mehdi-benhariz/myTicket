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

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post(':eventId')
  create(
    @Param('eventId') eventId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketService.create(eventId, createTicketDto);
  }

  @Get()
  findAll(@Query('eventId') eventId?: string) {
    if (eventId) {
      return this.ticketService.findAllByEvent(eventId);
    } else {
      return this.ticketService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
