import { Test, TestingModule } from '@nestjs/testing';
import { StocksparelogController } from './stocksparelog.controller';
import { StocksparelogService } from './stocksparelog.service';

describe('StocksparelogController', () => {
  let controller: StocksparelogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksparelogController],
      providers: [StocksparelogService],
    }).compile();

    controller = module.get<StocksparelogController>(StocksparelogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
