import {Controller, Get, Post, Body, Param, Put, UseGuards} from '@nestjs/common';
import { BmTransactionsService } from './bmtransactions.service';
import { BmTransaction } from './entities/bmtransaction.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bmtransactions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('dictator', 'sponsor') // ambos roles pueden acceder
export class BmTransactionsController {
  constructor(
    private readonly bmTransactionsService: BmTransactionsService,
  ) {}

  @Post()
  async create(
    @Body() transaction: Partial<BmTransaction>,
  ): Promise<BmTransaction> {
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
  async update(
    @Param('id') id: string,
    @Body() transaction: BmTransaction,
  ): Promise<BmTransaction> {
    return this.bmTransactionsService.update(id, transaction);
  }
}
