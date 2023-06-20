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
import { PaginationDto } from 'src/commons/paggination.dto';
import { Role } from 'src/decorators/roles';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomParseIntPipe } from 'src/pipes/parseInt.pipe';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(Role.Costumer, Role.Manager, Role.Admin)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: Request) {
    const { user } = req.locals;
    const ticketToBeCreated = {
      ...createTicketDto,
      userId: user.id,
    };
    return this.ticketService.create(ticketToBeCreated);
  }
  @Roles(Role.Costumer, Role.Admin)
  @Get()
  async findAll(
    @Query('ticketCategoryId') ticketCategoryId?: number,
    @Query('limit') limit = 10,
    @Query('page') page = 1,
    @Query('orderBy') orderBy?: keyof Ticket,
    @Query('searchField') searchField?: keyof Ticket,
    @Query('searchValue') searchValue?: string,
  ): Promise<PaginationDto<Ticket>> {
    return this.ticketService.findAll(
      searchField,
      searchValue,
      limit,
      page,
      orderBy,
    );
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
