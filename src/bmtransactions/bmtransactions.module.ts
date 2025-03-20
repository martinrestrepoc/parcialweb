import { Module } from '@nestjs/common';
import { BmtransactionsService } from './bmtransactions.service';
import { BmtransactionsController } from './bmtransactions.controller';

@Module({
  controllers: [BmtransactionsController],
  providers: [BmtransactionsService],
})
export class BmtransactionsModule {}
