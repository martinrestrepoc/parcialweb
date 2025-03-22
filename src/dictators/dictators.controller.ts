import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { CreateDictatorDto } from './dto/create-dictator.dto';
import { UpdateDictatorDto } from './dto/update-dictator.dto';
import { Dictator } from './entities/dictator.entity';
import { Contestant } from '../contestants/entities/contestant.entity';

@Controller('dictators')
export class DictatorsController {
  constructor(private readonly dictatorsService: DictatorsService) {}

  @Post()
  async create(@Body() createDictatorDto: CreateDictatorDto): Promise<Dictator> {
    return this.dictatorsService.create(createDictatorDto);
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
  async update(@Param('id') id: string, @Body() updateDictatorDto: UpdateDictatorDto): Promise<Dictator> {
    return this.dictatorsService.update(id, updateDictatorDto);
  }

  @Patch(':id/special-event')
  async addEvent(@Param('id') id: string, @Body() body: { event: string }): Promise<Dictator> {
    return this.dictatorsService.addSpecialEvent(id, body.event);
  }

  @Get(':id/contestants')
  async findContestants(@Param('id') id: string): Promise<Contestant[]> {
    return this.dictatorsService.findContestants(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.dictatorsService.remove(id);
  }
}
