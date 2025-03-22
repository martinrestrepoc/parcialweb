import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BmTransaction } from './entities/bmtransaction.entity';
import { CreateBmTransactionDto } from './dto/create-bmtransaction.dto';
import { UpdateBmTransactionDto } from './dto/update-bmtransaction.dto';

@Injectable()
export class BmTransactionsService {
  constructor(
    @InjectRepository(BmTransaction)
    private bmTransactionsRepository: Repository<BmTransaction>,
  ) {}

  async create(createTransactionDto: CreateBmTransactionDto): Promise<BmTransaction> {
    const transaction = this.bmTransactionsRepository.create(createTransactionDto);
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

  async update(id: string, updateTransactionDto: UpdateBmTransactionDto): Promise<BmTransaction> {
    const existingTransaction = await this.bmTransactionsRepository.findOneBy({ id });
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    await this.bmTransactionsRepository.update(id, updateTransactionDto);
    return this.findOne(id); // Return updated transaction
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.bmTransactionsRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    await this.bmTransactionsRepository.delete(id);
  }
}
