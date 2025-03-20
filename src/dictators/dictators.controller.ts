import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { Dictator } from './entities/dictator.entity';

@Controller('dictators')
export class DictatorsController {
  constructor(private readonly dictatorsService: DictatorsService) {}

  @Post()
  async create(@Body() dictator: Dictator): Promise<Dictator> {
    return this.dictatorsService.create(dictator);
  }

  @Get()
  async findAll(): Promise<Dictator[]> {
    return this.dictatorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dictator> {
    return this.dictatorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dictator: Dictator): Promise<Dictator> {
    return this.dictatorsService.update(id, dictator);
  }
}