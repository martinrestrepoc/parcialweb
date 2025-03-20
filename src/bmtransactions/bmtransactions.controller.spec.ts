import { Test, TestingModule } from '@nestjs/testing';
import { BmtransactionsController } from './bmtransactions.controller';
import { BmtransactionsService } from './bmtransactions.service';

describe('BmtransactionsController', () => {
  let controller: BmtransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BmtransactionsController],
      providers: [BmtransactionsService],
    }).compile();

    controller = module.get<BmtransactionsController>(BmtransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
