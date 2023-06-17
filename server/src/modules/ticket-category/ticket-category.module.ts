import { Module } from '@nestjs/common';
import { TicketCategoryService } from './ticket-category.service';
import { TicketCategoryController } from './ticket-category.controller';

@Module({
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
})
export class TicketCategoryModule {}
