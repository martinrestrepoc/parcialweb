import { Test, TestingModule } from '@nestjs/testing';
import { BmTransactionsController } from './bmtransactions.controller';
import { BmTransactionsService } from './bmtransactions.service';

describe('BmtransactionsController', () => {
  let controller: BmTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BmTransactionsController],
      providers: [BmTransactionsService],
    }).compile();

    controller = module.get<BmTransactionsController>(BmTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
