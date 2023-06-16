import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './../../event/entities/event.entity';
import { User } from './..//../user/entities/user.entity';

@Entity()
export class Ticket {
  constructor(partial: Partial<Ticket>) {
    Object.assign(this, partial);
    this.date = new Date();
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({})
  eventId: number;
  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn({ name: 'eventId' })
  event: Event;
  //! nullable is logically wrong , change it after you udpate database
  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'userId' })
  user: User;
}
