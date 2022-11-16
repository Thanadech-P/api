import { Test, TestingModule } from '@nestjs/testing';
import { StockspareController } from './stockspare.controller';
import { StockspareService } from './stockspare.service';

describe('StockspareController', () => {
  let controller: StockspareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockspareController],
      providers: [StockspareService],
    }).compile();

    controller = module.get<StockspareController>(StockspareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
