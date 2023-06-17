import { Test, TestingModule } from '@nestjs/testing';
import { TicketCategoryService } from './ticket-category.service';

describe('TicketCategoryService', () => {
  let service: TicketCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketCategoryService],
    }).compile();

    service = module.get<TicketCategoryService>(TicketCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
