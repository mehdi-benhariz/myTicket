import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketCategoryService } from './ticket-category.service';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket Category')
@Controller('ticket-category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}

  @Post()
  create(@Body() createTicketCategoryDto: CreateTicketCategoryDto) {
    return this.ticketCategoryService.create(createTicketCategoryDto);
  }

  @Get()
  findAll() {
    return this.ticketCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketCategoryDto: UpdateTicketCategoryDto,
  ) {
    return this.ticketCategoryService.update(+id, updateTicketCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketCategoryService.remove(+id);
  }
}
