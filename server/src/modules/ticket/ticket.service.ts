import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { saveAs } from 'file-saver';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { GenericService } from 'src/commons/genericService.interface';
import { PaginationDto } from 'src/commons/paggination.dto';
import { generatePDF } from 'src/utils/pdf-helper';
import { _handleSearch } from 'src/utils/service-helpers';
import { EntityManager } from 'typeorm';
import { EventService } from '../event/event.service';
import { User } from '../user/entities/user.entity';
import { TicketCategoryService } from './../ticket-category/ticket-category.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService implements GenericService<Ticket> {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventService: EventService,
    private readonly ticketCategoryService: TicketCategoryService,
  ) {}

  async create(ticketOtBeCreated: Partial<Ticket>): Promise<Ticket> {
    // createTicketDto.eventId = eventId;
    const category = await this.ticketCategoryService.findOne(
      ticketOtBeCreated.ticketCategoryId,
    );
    if (!category) throw new NotFoundException('Ticket category not found');

    if (category.capacity <= category.tickets.length)
      throw new BadRequestException(
        `Sorry, the ticket category ${category.name} is sold out 🙁`,
      );

    const ticket = this.entityManager.create(Ticket, {
      ...ticketOtBeCreated,
    });
    return await this.entityManager.save(Ticket, ticket);
  }

  async findAll(
    searchField?: keyof Ticket,
    searchValue?: string,
    limit = 10,
    page = 1,
    orderBy?: keyof Ticket,
  ): Promise<PaginationDto<Ticket>> {
    const query = this.entityManager.createQueryBuilder(Ticket, 'ticket');

    _handleSearch<Ticket>(query, searchField, searchValue, 'ticket');

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

  async generateTicket(ticketId: number, user: User) {
    try {
      const ticket = await this.findOne(ticketId);

      const pdf = await generatePDF(ticket);

      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        `ticket_${ticketId}.pdf`,
      );

      await fsPromises.writeFile(filePath, pdf);
      const blob = new Blob([pdf], { type: 'application/pdf' });
      saveAs(blob, `ticket_${ticketId}.pdf`);
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error generating ticket:', error);
      throw new InternalServerErrorException('Failed to generate ticket');
    }
  }
}
