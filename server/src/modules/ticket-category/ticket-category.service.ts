import { Injectable } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

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
    search?: (queryBuilder: SelectQueryBuilder<TicketCategory>) => void,
    limit = 10,
    page = 1,
    orderBy?: keyof TicketCategory,
  ): Promise<TicketCategory[]> {
    const query = this.entityManager.createQueryBuilder(
      TicketCategory,
      'ticket_category',
    );

    if (search) search(query);

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    if (orderBy) query.orderBy(`ticket_category.${orderBy}`);

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
