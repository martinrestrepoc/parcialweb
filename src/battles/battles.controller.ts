import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { Battle } from './entities/battle.entity';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  async create(@Body() battle: Battle): Promise<Battle> {
    return this.battlesService.create(battle);
  }

  @Get()
  async findAll(): Promise<Battle[]> {
    return this.battlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Battle> {
    return this.battlesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() battle: Battle): Promise<Battle> {
    return this.battlesService.update(id, battle);
  }
}