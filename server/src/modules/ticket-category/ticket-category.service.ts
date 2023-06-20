import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import {
  _handleOrderBy,
  _handlePagination,
  _handleSearch,
} from 'src/utils/service-helpers';

@Injectable()
export class TicketCategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  create(createTicketCategoryDto: CreateTicketCategoryDto) {
    const ticketCategory = this.entityManager.create(
      TicketCategory,
      createTicketCategoryDto,
    );
    return this.entityManager.save(ticketCategory);
  }

  async findAll(
    searchField?: keyof TicketCategory,
    searchValue?: string,
    limit = 10,
    page = 1,
    orderBy?: keyof TicketCategory,
  ): Promise<TicketCategory[]> {
    const query = this.entityManager.createQueryBuilder(
      TicketCategory,
      'ticket_category',
    );
    // search
    _handleSearch<TicketCategory>(
      query,
      searchField,
      searchValue,
      TicketCategory,
      'ticket_category',
    );
    // this._handleSearch(query, searchField, searchValue);
    //pagination
    _handlePagination<TicketCategory>(query, limit, page);
    // this._handlePagination(query, limit, page);

    //order by
    _handleOrderBy<TicketCategory>(query, orderBy, 'ticket_category');
    // this._handleOrderBy(query, orderBy);
    //execute query
    return await query.getMany();
  }

  findOne(id: number) {
    return this.entityManager.findOne(TicketCategory, {
      where: { id },
      relations: ['tickets'],
    });
  }

  async update(id: number, updateTicketCategoryDto: UpdateTicketCategoryDto) {
    const ticketCategory = await this.findOne(id);
    if (!ticketCategory)
      throw new Error(`TicketCategory with ID ${id} not found`);

    Object.assign(ticketCategory, updateTicketCategoryDto);

    return await this.entityManager.save(ticketCategory);
  }

  async remove(id: number) {
    const ticketCategory = await this.findOne(id);
    if (!ticketCategory) {
      throw new Error(`TicketCategory with ID ${id} not found`);
    }

    await this.entityManager.remove(ticketCategory);
  }

  // ****HELPER METHODS****
  _handleSearch(
    query: SelectQueryBuilder<TicketCategory>,
    searchField: keyof TicketCategory,
    searchValue: string,
  ) {
    if (!searchField || !searchValue) return;
    const isFieldValid = Object.prototype.hasOwnProperty.call(
      TicketCategory,
      searchField,
    );
    if (isFieldValid)
      query.where(`ticket_category.${searchField} = :searchValue`, {
        searchValue,
      });
    else throw new BadRequestException('Invalid search field 🙃');
  }

  _handlePagination(
    query: SelectQueryBuilder<TicketCategory>,
    limit: number,
    page: number,
  ) {
    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);
  }

  _handleOrderBy(
    query: SelectQueryBuilder<TicketCategory>,
    orderBy: keyof TicketCategory,
  ) {
    if (!orderBy) return;
    const entityMetadata = query.expressionMap.mainAlias.metadata;
    const column = entityMetadata.findColumnWithPropertyName(orderBy as string);
    if (column) query.orderBy(`ticket_category.${column.databaseName}`);
    else throw new BadRequestException('Invalid order by field 🙃');
    //*second option
    // const isFieldValid = Object.prototype.hasOwnProperty.call(
    //   Object.getPrototypeOf(query),

    //   orderBy,
    // );

    // if (isFieldValid) query.orderBy(`ticket_category.${orderBy}`);
    // else throw new BadRequestException('Invalid order by field');
  }
}
