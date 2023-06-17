import { Test, TestingModule } from '@nestjs/testing';
import { TicketCategoryController } from '../../src/modules/ticket-category/ticket-category.controller';
import { TicketCategoryService } from '../../src/modules/ticket-category/ticket-category.service';

describe('TicketCategoryController', () => {
  let controller: TicketCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketCategoryController],
      providers: [TicketCategoryService],
    }).compile();

    controller = module.get<TicketCategoryController>(TicketCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
