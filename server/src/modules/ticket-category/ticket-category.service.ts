import { Injectable } from '@nestjs/common';
import {
  _handleOrderBy,
  _handlePagination,
  _handleSearch,
} from 'src/utils/service-helpers';
import { EntityManager } from 'typeorm';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';

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
}
