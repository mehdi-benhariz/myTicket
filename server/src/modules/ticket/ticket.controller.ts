import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@Controller(':eventId/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(
    @Param('eventId') eventId: number,
    @Body() createTicketDto: CreateTicketDto,
    @Req() req: Request,
  ) {
    const { user } = req.locals;
    return this.ticketService.create(eventId, createTicketDto, user.id);
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
