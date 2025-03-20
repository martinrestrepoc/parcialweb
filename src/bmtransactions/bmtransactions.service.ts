import { Injectable } from '@nestjs/common';
import { CreateBmtransactionDto } from './dto/create-bmtransaction.dto';
import { UpdateBmtransactionDto } from './dto/update-bmtransaction.dto';

@Injectable()
export class BmtransactionsService {
  create(createBmtransactionDto: CreateBmtransactionDto) {
    return 'This action adds a new bmtransaction';
  }

  findAll() {
    return `This action returns all bmtransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bmtransaction`;
  }

  update(id: number, updateBmtransactionDto: UpdateBmtransactionDto) {
    return `This action updates a #${id} bmtransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} bmtransaction`;
  }
}
