import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomParseIntPipe } from 'src/pipes/parseInt.pipe';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { TicketCategoryService } from './ticket-category.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Ticket Category')
@Controller('ticket-category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}
  @Roles(Role.Costumer, Role.Admin)
  @Post()
  create(@Body() createTicketCategoryDto: CreateTicketCategoryDto) {
    return this.ticketCategoryService.create(createTicketCategoryDto);
  }
  @Get()
  findAll(
    @Query('page', new CustomParseIntPipe()) page?: number,
    @Query('limit', new CustomParseIntPipe()) limit?: number,
    @Query('orderBy') orderBy?: keyof TicketCategory,
    @Query('searchField') searchField?: keyof TicketCategory,
    @Query('searchValue') searchValue?: string,
  ) {
    return this.ticketCategoryService.findAll(
      searchField,
      searchValue,
      limit,
      page,
      orderBy,
    );
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
