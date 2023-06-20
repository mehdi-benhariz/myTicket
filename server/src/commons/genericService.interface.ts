import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from './paggination.dto';

export interface GenericService<T> {
  create(entity: Partial<T>, args?: any): Promise<T>;
  findAll(
    search?: (entity: T) => boolean,
    limit?: number,
    page?: number,
    orderBy?: keyof T,
  ): Promise<PaginationDto<any> | T[] | any[]>;
  findOne(id: number, relations?: string[]): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T>;
  remove(id: number): Promise<void>;
}
