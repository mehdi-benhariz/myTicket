import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/commons/genericService.interface';
import { EntityManager, FindOneOptions } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

//there's a problem when using the repository, so we use the entityManager instead
@Injectable()
export class EventService implements GenericService<Event> {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.entityManager.create(Event, createEventDto);
    return await this.entityManager.save(Event, event);
  }

  async findAll(
    search?: (event: Event) => boolean,
    limit = 10,
    page = 1,
    orderBy?: keyof Event,
  ): Promise<Event[]> {
    const query = this.entityManager.createQueryBuilder(Event, 'event');

    if (search) {
      query.where(search);
    }

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    if (orderBy) {
      query.orderBy(`event.${orderBy}`);
    }

    return query.getMany();
  }

  async findOne(id: number, relations: string[] = []): Promise<Event> {
    const queryOptions: FindOneOptions<Event> = {
      where: { id },
    };

    if (relations.length > 0) queryOptions.relations = relations;

    return await this.entityManager.findOne(Event, queryOptions);
    // const event = await this.entityManager.findOneBy(Event, { id });
    // if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    // return event;
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
