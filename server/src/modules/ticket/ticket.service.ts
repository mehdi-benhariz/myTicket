import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/commons/paggination.dto';
import { EntityManager } from 'typeorm';
import { EventService } from '../event/event.service';
import { TicketCategoryService } from './../ticket-category/ticket-category.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventService: EventService,
    private readonly ticketCategoryService: TicketCategoryService,
  ) {}

  async create(
    createTicketDto: CreateTicketDto,
    userId: number,
  ): Promise<Ticket> {
    // createTicketDto.eventId = eventId;

    // createTicketDto.userId = userId;
    const ticketOtBeCreated = { ...createTicketDto, userId };
    //TODO check capacity , if total tickets is greater than capacity throw error
    const category = await this.ticketCategoryService.findOne(
      ticketOtBeCreated.ticketCategoryId,
    );
    if (!category) throw new NotFoundException('Ticket category not found');

    if (category.capacity >= category.tickets.length)
      throw new Error(
        `Sorry, the ticket category ${category.name} is sold out 🙁`,
      );

    const ticket = this.entityManager.create(Ticket, {
      ...ticketOtBeCreated,
    });
    return await this.entityManager.save(Ticket, ticket);
  }

  async findAll(
    search?: (ticket: Ticket) => boolean,
    limit = 10,
    page = 1,
    orderBy?: keyof Ticket,
  ): Promise<PaginationDto<Ticket>> {
    const query = this.entityManager.createQueryBuilder(Ticket, 'ticket');

    if (search) query.where(search);

    const [data, totalCount] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(orderBy ? `ticket.${orderBy}` : undefined)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);

    const paginationDto: PaginationDto<Ticket> = {
      data,
      totalCount,
      currentPage: page,
      totalPages,
    };

    return paginationDto;
  }

  async findAllByEvent(eventId: string): Promise<Ticket[]> {
    await this.eventService.findOne(+eventId);
    const query = this.entityManager.createQueryBuilder(Ticket, 'ticket');
    query.where('ticket.eventId = :eventId', { eventId });
    return query.getMany();

    // return await this.entityManager.findBy(Ticket, {
    //   eventId: eventId,
    // });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.entityManager.findOne(Ticket, { where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    return await this.entityManager.save(Ticket, ticket);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.entityManager.delete(Ticket, id);
  }
}
