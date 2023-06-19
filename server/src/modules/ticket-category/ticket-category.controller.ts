import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomParseIntPipe } from 'src/pipes/parseInt.pipe';
import { SelectQueryBuilder } from 'typeorm';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { TicketCategoryService } from './ticket-category.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Ticket Category')
@Controller(':eventId/ticket-category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}
  @Roles(Role.Costumer, Role.Admin)
  @Post()
  create(@Body() createTicketCategoryDto: CreateTicketCategoryDto) {
    return this.ticketCategoryService.create(createTicketCategoryDto);
  }
  @Get()
  findAll(@Param('eventId', new CustomParseIntPipe()) eventId: number) {
    const search = eventId
      ? (queryBuilder: SelectQueryBuilder<TicketCategory>) => {
          queryBuilder.where('ticket_category.eventId = :eventId', {
            eventId,
          });
        }
      : undefined;

    return this.ticketCategoryService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', new CustomParseIntPipe()) id: number) {
    return this.ticketCategoryService.findOne(+id);
  }
  @Roles(Role.Costumer, Role.Admin)
  @Patch(':id')
  update(
    @Param('id', new CustomParseIntPipe()) id: number,
    @Body() updateTicketCategoryDto: UpdateTicketCategoryDto,
  ) {
    return this.ticketCategoryService.update(+id, updateTicketCategoryDto);
  }
  @Roles(Role.Costumer, Role.Admin)
  @Delete(':id')
  remove(@Param('id', new CustomParseIntPipe()) id: number) {
    return this.ticketCategoryService.remove(+id);
  }
}
