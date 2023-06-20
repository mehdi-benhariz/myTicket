// import { Injectable } from '@nestjs/common';
// import { EntityManager, FindOneOptions, Repository } from 'typeorm';

// @Injectable()
// export abstract class GenericService<T> {
//   protected abstract readonly repository: Repository<T>;

//   constructor(protected readonly entityManager: EntityManager) {}

//   async create(entity: T): Promise<T> {
//     return await this.entityManager.save(this.repository.create(entity));
//   }

//   async findAll(
//     search?: (entity: T) => boolean,
//     limit = 10,
//     page = 1,
//     orderBy?: keyof T,
//   ): Promise<T[]> {
//     const query = this.repository.createQueryBuilder();

//     if (search) query.where(search);

//     const offset = (page - 1) * limit;
//     query.skip(offset).take(limit);

//     if (orderBy) query.orderBy(orderBy);

//     return query.getMany();
//   }

//   async findOne(id: number, relations: string[] = []): Promise<T> {
//     const queryOptions: FindOneOptions<T> = {
//       where: { id },
//     };
//     if (relations.length > 0) queryOptions.relations = relations;

//     return await this.repository.findOne(queryOptions);
//   }
//   async update(id: number, entity: T): Promise<T> {
//     //TODO : fix this
//     //! not sure of the side effects of using as any
//     await this.repository.update(id, entity as any);
//     return await this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }
// }
