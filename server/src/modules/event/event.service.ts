import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/commons/genericService.interface';
import { EntityManager, FindOneOptions } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import {
  _handleOrderBy,
  _handlePagination,
  _handleSearch,
} from 'src/utils/service-helpers';

//there's a problem when using the repository, so we use the entityManager instead
@Injectable()
export class EventService implements GenericService<Event> {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.entityManager.create(Event, createEventDto);
    return await this.entityManager.save(Event, event);
  }

  async findAll(
    searchField?: keyof Event,
    searchValue?: string,
    limit = 10,
    page = 1,
    orderBy?: keyof Event,
  ): Promise<Event[]> {
    const query = this.entityManager.createQueryBuilder(Event, 'event');

    _handleSearch<Event>(query, searchField, searchValue, 'event');

    _handlePagination<Event>(query, limit, page);

    _handleOrderBy<Event>(query, orderBy, 'event');

    return await query.getMany();
  }

  async findOne(id: number, relations: string[] = []): Promise<Event> {
    const queryOptions: FindOneOptions<Event> = {
      where: { id },
    };

    if (relations.length > 0) queryOptions.relations = relations;

    return await this.entityManager.findOne(Event, queryOptions);
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
