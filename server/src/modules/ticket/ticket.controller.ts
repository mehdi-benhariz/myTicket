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
import { PaginationDto } from 'src/commons/paggination.dto';
import { Ticket } from './entities/ticket.entity';

@ApiTags('Ticket')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(Role.Costumer, Role.Manager, Role.Admin)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: Request) {
    const { user } = req.locals;
    return this.ticketService.create(createTicketDto, user.id);
  }
  @Roles(Role.Costumer, Role.Admin)
  @Get()
  async findAll(
    @Query('ticketCategoryId') ticketCategoryId?: number,
    @Query('limit') limit = 10,
    @Query('page') page = 1,
    @Query('orderBy') orderBy?: keyof Ticket,
  ): Promise<PaginationDto<Ticket>> {
    const search = ticketCategoryId
      ? (ticket: Ticket) => ticket.ticketCategoryId === ticketCategoryId
      : undefined;

    return this.ticketService.findAll(search, limit, page, orderBy);
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
