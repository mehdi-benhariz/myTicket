import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'customer' })
  role: string;

  // @Column()
  // @OneToMany(() => Ticket, (ticket) => ticket.owner, { cascade: true })
  // tickets: Ticket[];
}
