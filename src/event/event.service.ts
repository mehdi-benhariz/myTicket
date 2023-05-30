import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
    });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    //option 2: const event = await this.eventRepository.findOneBy({ id });
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return await this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
