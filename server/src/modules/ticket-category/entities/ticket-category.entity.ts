import { Event } from 'src/modules/event/entities/event.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class TicketCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  @Column()
  price: number;

  @Column()
  capacity: number;
  @Column()
  eventId: number;
  @ManyToOne(() => Event, (event) => event.ticketCategories)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @OneToMany(() => Ticket, (ticket) => ticket.ticketCategory, { cascade: true })
  tickets: Ticket[];
}
