import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';


//there's a problem when using the repository, so we use the entityManager instead
@Injectable()
export class EventService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.entityManager.create(Event, createEventDto);
    return await this.entityManager.save(Event, event);
  }

  async findAll(): Promise<Event[]> {
    return await this.entityManager.find(Event);
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.entityManager.findOneBy(Event, {id});
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return await this.entityManager.save(Event, event);
  }

  async remove(id: number): Promise<void> {
    await this.entityManager.delete(Event, id);
  }
}
