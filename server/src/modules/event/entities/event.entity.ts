import { TicketCategory } from 'src/modules/ticket-category/entities/ticket-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
