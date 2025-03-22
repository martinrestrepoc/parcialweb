import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BmTransactionsService } from './bmtransactions.service';
import { CreateBmTransactionDto } from './dto/create-bmtransaction.dto';
import { UpdateBmTransactionDto } from './dto/update-bmtransaction.dto';
import { BmTransaction } from './entities/bmtransaction.entity';

@Controller('bmtransactions')
export class BmTransactionsController {
  constructor(private readonly bmTransactionsService: BmTransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateBmTransactionDto): Promise<BmTransaction> {
    return this.bmTransactionsService.create(createTransactionDto);
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
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateBmTransactionDto): Promise<BmTransaction> {
    return this.bmTransactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bmTransactionsService.remove(id);
  }
}
