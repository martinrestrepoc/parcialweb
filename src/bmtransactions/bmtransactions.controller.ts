import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BmtransactionsService } from './bmtransactions.service';
import { CreateBmtransactionDto } from './dto/create-bmtransaction.dto';
import { UpdateBmtransactionDto } from './dto/update-bmtransaction.dto';

@Controller('bmtransactions')
export class BmtransactionsController {
  constructor(private readonly bmtransactionsService: BmtransactionsService) {}

  @Post()
  create(@Body() createBmtransactionDto: CreateBmtransactionDto) {
    return this.bmtransactionsService.create(createBmtransactionDto);
  }

  @Get()
  findAll() {
    return this.bmtransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bmtransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBmtransactionDto: UpdateBmtransactionDto) {
    return this.bmtransactionsService.update(+id, updateBmtransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bmtransactionsService.remove(+id);
  }
}
