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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/decorators/roles';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomParseIntPipe } from 'src/pipes/parseInt.pipe';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(':eventId/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(Role.Costumer)
  @Post()
  create(
    @Param('eventId', new CustomParseIntPipe()) eventId: number,
    @Body() createTicketDto: CreateTicketDto,
    @Req() req: Request,
  ) {
    const { user } = req.locals;
    return this.ticketService.create(eventId, createTicketDto, user.id);
  }
  @Roles(Role.Costumer, Role.Admin)
  @Get()
  findAll(@Query('eventId') eventId?: string) {
    if (eventId) return this.ticketService.findAllByEvent(eventId);
    else return this.ticketService.findAll();
  }

  @Get(':ticketId')
  findOne(@Param('ticketId', new CustomParseIntPipe()) ticketId: string) {
    return this.ticketService.findOne(+ticketId);
  }

  @Patch(':ticketId')
  update(
    @Param('ticketId', new CustomParseIntPipe()) ticketId: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(+ticketId, updateTicketDto);
  }

  @Delete(':ticketId')
  remove(@Param('ticketId', new CustomParseIntPipe()) ticketId: string) {
    return this.ticketService.remove(+ticketId);
  }
}
