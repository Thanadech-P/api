import { Test, TestingModule } from '@nestjs/testing';
import { StocksparelogService } from './stocksparelog.service';

describe('StocksparelogService', () => {
  let service: StocksparelogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksparelogService],
    }).compile();

    service = module.get<StocksparelogService>(StocksparelogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
