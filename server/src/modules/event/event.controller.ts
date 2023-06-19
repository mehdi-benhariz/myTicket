import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@ApiTags('Event')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  @Roles(Role.Costumer, Role.Admin, Role.Manager)
  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @Roles(Role.Costumer, Role.Admin, Role.Manager)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.eventService.findOne(+id);
  }
  @Roles(Role.Admin, Role.Manager)
  @Patch(':id')
  update(
    @Param('id', new CustomParseIntPipe()) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+id, updateEventDto);
  }
  @Roles(Role.Admin, Role.Manager)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.eventService.remove(+id);
  }
}
