import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BmTransactionsService } from './bmtransactions.service';
import { BmTransaction } from './entities/bmtransaction.entity';

@Controller('bmtransactions')
export class BmTransactionsController {
  constructor(private readonly bmTransactionsService: BmTransactionsService) {}

  @Post()
  async create(@Body() transaction: BmTransaction): Promise<BmTransaction> {
    return this.bmTransactionsService.create(transaction);
  }

  @Get()
  async findAll(): Promise<BmTransaction[]> {
    return this.bmTransactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BmTransaction> {
    return this.bmTransactionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() transaction: BmTransaction): Promise<BmTransaction> {
    return this.bmTransactionsService.update(id, transaction);
  }
}