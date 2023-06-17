import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { TicketCategory } from 'src/modules/ticket-category/entities/ticket-category.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  place: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => TicketCategory, (ticketCategory) => ticketCategory.event, {
    cascade: true,
  })
  ticketCategories: TicketCategory[];
}
