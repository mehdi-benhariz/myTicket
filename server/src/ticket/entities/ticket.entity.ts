import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
  //make it default to date now
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn({ name: 'eventId' })
  event: Event;
  @Column()
  eventId: string;
  // @ManyToOne(() => User, (user) => user.tickets)
  // @JoinColumn({ name: 'userId' })
  // owner: User;
  // @Column()
  // userId: string;
}
