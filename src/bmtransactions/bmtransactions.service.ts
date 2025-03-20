import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BmTransaction } from './entities/bmtransaction.entity';

@Injectable()
export class BmTransactionsService {
  constructor(
    @InjectRepository(BmTransaction)
    private bmTransactionsRepository: Repository<BmTransaction>,
  ) {}

  async create(transaction: BmTransaction): Promise<BmTransaction> {
    return this.bmTransactionsRepository.save(transaction);
  }

  async findAll(): Promise<BmTransaction[]> {
    return this.bmTransactionsRepository.find();
  }

  async findOne(id: string): Promise<BmTransaction> {
    const transaction = await this.bmTransactionsRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, transaction: BmTransaction): Promise<BmTransaction> {
    const existingTransaction = await this.bmTransactionsRepository.findOneBy({ id });
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    await this.bmTransactionsRepository.update(id, transaction);
    const updatedTransaction = await this.bmTransactionsRepository.findOneBy({ id });
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }
}
