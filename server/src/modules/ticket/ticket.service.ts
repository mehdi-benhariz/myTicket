import { Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { EntityManager } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventService: EventService,
  ) {}

  async create(
    eventId: number,
    createTicketDto: CreateTicketDto,
    userId: number,
  ): Promise<Ticket> {
    createTicketDto.eventId = eventId;

    createTicketDto.userId = userId;

    const ticket = this.entityManager.create(Ticket, {
      ...createTicketDto,
    });
    return await this.entityManager.save(Ticket, ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.entityManager.find(Ticket);
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
