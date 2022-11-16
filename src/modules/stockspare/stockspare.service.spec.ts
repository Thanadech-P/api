import { Test, TestingModule } from '@nestjs/testing';
import { StockspareService } from './stockspare.service';

describe('StockspareService', () => {
  let service: StockspareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockspareService],
    }).compile();

    service = module.get<StockspareService>(StockspareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
