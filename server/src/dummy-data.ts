import { createConnection } from 'typeorm';
import { Event } from './event/entities/event.entity';
import { Ticket } from './ticket/entities/ticket.entity';

async function fillDatabaseWithDummyData() {
  try {
    // Create database connection
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mehdi',
      password: 'M1e2h3d4i5',
      database: 'myticket_db',
      entities: [Event, Ticket],
      synchronize: true,
    });

    // Generate dummy events
    const events: Event[] = [];
    for (let i = 1; i <= 6; i++) {
      const event = new Event();
      event.name = `Event ${i}`;
      event.date = new Date(`2023-06-${i}`);
      event.place = `Venue ${i}`;
      event.description = `Description for Event ${i}`;
      events.push(event);
    }

    // Generate dummy tickets
    const tickets: Ticket[] = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 4; j++) {
        const ticket = new Ticket();
        ticket.price = 10 + i + j;
        ticket.event = events[i - 1];
        tickets.push(ticket);
      }
    }

    // Save events and tickets to the database
    await connection.manager.save(events);
    await connection.manager.save(tickets);

    // Close the database connection
    await connection.close();

    console.log('Dummy data has been successfully inserted into the database.');
  } catch (error) {
    console.error('Error occurred while inserting dummy data:', error);
  }
}

// Execute the script
fillDatabaseWithDummyData();
