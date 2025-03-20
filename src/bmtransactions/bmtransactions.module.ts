import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BmTransaction } from './entities/bmtransaction.entity';
import { BmTransactionsService } from './bmtransactions.service';
import { BmTransactionsController } from './bmtransactions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BmTransaction])],  // Inyección del repositorio de BmTransaction
  providers: [BmTransactionsService],
  controllers: [BmTransactionsController],
})
export class BmTransactionsModule {}