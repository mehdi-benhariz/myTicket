import { PickType } from '@nestjs/swagger';
import { EventValidator } from '../entities/event.validator';

export class CreateEventDto extends PickType(EventValidator, [
  'name',
  'description',
  'date',
  'place',
] as const) {}
