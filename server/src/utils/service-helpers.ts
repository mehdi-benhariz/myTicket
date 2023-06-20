import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

export function _handleSearch<T>(
  query: SelectQueryBuilder<T>,
  searchField: keyof T,
  searchValue: string,
  entity: any,
  tableName: string,
) {
  const isFieldValid = Object.prototype.hasOwnProperty.call(
    entity,
    searchField,
  );
  if (isFieldValid)
    query.where(`${tableName}.${searchField.toString()} = :searchValue`, {
      searchValue,
    });
  else throw new BadRequestException('Invalid search field 🙃');
}

export function _handlePagination<T>(
  query: SelectQueryBuilder<T>,
  limit: number,
  page: number,
) {
  const offset = (page - 1) * limit;
  query.skip(offset).take(limit);
}

export function _handleOrderBy<T>(
  query: SelectQueryBuilder<T>,
  orderBy: keyof T,
  tableName: string,
) {
  if (!orderBy) return;
  const entityMetadata = query.expressionMap.mainAlias.metadata;
  const column = entityMetadata.findColumnWithPropertyName(orderBy as string);
  if (column) query.orderBy(`${tableName}.${column.databaseName}`);
  else throw new BadRequestException('Invalid order by field 🙃');
  // const isFieldValid = Object.prototype.hasOwnProperty.call(entity, orderBy);
  // if (isFieldValid) query.orderBy(`${tableName}.${orderBy.toString()}`);
  // else throw new BadRequestException('Invalid order by field 🙃');
}
