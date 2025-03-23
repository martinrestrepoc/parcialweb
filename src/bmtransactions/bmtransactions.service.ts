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

  // ✅ acepta data parcial para ser reutilizable
  async create(data: Partial<BmTransaction>): Promise<BmTransaction> {
    const transaction = this.bmTransactionsRepository.create(data);
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
    const existing = await this.bmTransactionsRepository.findOneBy({ id });
    if (!existing) {
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