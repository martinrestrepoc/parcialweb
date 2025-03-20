import { Test, TestingModule } from '@nestjs/testing';
import { BmtransactionsService } from './bmtransactions.service';

describe('BmtransactionsService', () => {
  let service: BmtransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BmtransactionsService],
    }).compile();

    service = module.get<BmtransactionsService>(BmtransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
