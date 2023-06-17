import { TicketCategory } from 'src/modules/ticket-category/entities/ticket-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './..//../user/entities/user.entity';

@Entity()
export class Ticket {
  constructor(partial: Partial<Ticket>) {
    Object.assign(this, partial);
    this.date = new Date();
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  userId: number;
  @ManyToOne(() => User, (owner) => owner.tickets)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @Column()
  ticketCategoryId: number;
  @ManyToOne(() => TicketCategory, (ticketCategory) => ticketCategory.tickets)
  @JoinColumn({ name: 'ticketCategoryId' })
  ticketCategory: TicketCategory;
}
