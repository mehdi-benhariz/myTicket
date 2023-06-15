import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column({ default: 'customer' })
  role: string;

  // @Column()
  // @OneToMany(() => Ticket, (ticket) => ticket.owner, { cascade: true })
  // tickets: Ticket[];
}
