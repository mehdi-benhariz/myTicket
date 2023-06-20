import { PaginationDto } from './paggination.dto';

export interface GenericService<T> {
  create(entity: Partial<T>, args?: any): Promise<T>;
  findAll(
    searchField?: keyof T,
    searchValue?: string,
    limit?: number,
    page?: number,
    orderBy?: keyof T,
  ): Promise<PaginationDto<any> | T[] | any[]>;
  findOne(id: number, relations?: string[]): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T>;
  remove(id: number): Promise<void>;
}
