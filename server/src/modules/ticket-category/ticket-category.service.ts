import { Injectable } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { TicketCategory } from './entities/ticket-category.entity';
import { EntityManager } from 'typeorm';

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

  findAll(
    search?: (category: TicketCategory) => boolean,
    limit = 10,
    page = 1,
    orderBy?: keyof TicketCategory,
  ): Promise<TicketCategory[]> {
    const query = this.entityManager.createQueryBuilder(
      TicketCategory,
      'ticket_category',
    );

    if (search) query.where(search);

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    if (orderBy) query.orderBy(`ticket_category.${orderBy}`);

    return query.getMany();
  }

  findOne(id: number) {
    return this.entityManager.findOne(TicketCategory, { where: { id } });
  }

  async update(id: number, updateTicketCategoryDto: UpdateTicketCategoryDto) {
    const ticketCategory = await this.findOne(id);
    if (!ticketCategory)
      throw new Error(`TicketCategory with ID ${id} not found`);

    Object.assign(ticketCategory, updateTicketCategoryDto);

    return this.entityManager.save(ticketCategory);
  }

  async remove(id: number) {
    const ticketCategory = await this.findOne(id);
    if (!ticketCategory) {
      throw new Error(`TicketCategory with ID ${id} not found`);
    }

    await this.entityManager.remove(ticketCategory);
  }
}
