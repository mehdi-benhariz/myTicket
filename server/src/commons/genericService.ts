import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import {
  _handleOrderBy,
  _handlePagination,
  _handleSearch,
} from 'src/utils/service-helpers';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export abstract class GenericService<T> implements GenericService<T> {
  protected abstract readonly repository: Repository<T>;

  constructor(protected readonly entityManager: EntityManager) {}
  // entity -> db table name
  EntityToTable: { [key: string]: string } = {
    Ticket: 'ticket',
    Event: 'event',
  };
  async create(entity: T): Promise<T> {
    return await this.entityManager.save(this.repository.create(entity));
  }

  async findAll(
    searchField?: keyof T,
    searchValue?: string,
    limit?: number,
    page?: number,
    orderBy?: keyof T,
  ): Promise<T[]> {
    const query = this.repository.createQueryBuilder();
    //TODO: make table name dynamic
    _handleSearch<T>(query, searchField, searchValue, 'event');
    _handlePagination(query, limit, page);
    _handleOrderBy<T>(query, orderBy, 'event');
    return query.getMany();
  }
  //! need to be fixed
  async findOne(id: number, relations: string[] = []): Promise<T | User> {
    const queryOptions: FindOneOptions<User> = {
      where: { id },
    };

    if (relations.length > 0) queryOptions.relations = relations;

    return this.entityManager.findOne(User, queryOptions);
  }

  async update(id: number, entity: T): Promise<T> {
    //TODO : fix this
    //! not sure of the side effects of using as any
    await this.repository.update(id, entity as any);
    return (await this.findOne(id)) as any;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
