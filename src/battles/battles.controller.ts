import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { Battle } from './entities/battle.entity';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  async create(@Body() createBattleDto: CreateBattleDto): Promise<Battle> {
    return this.battlesService.create(createBattleDto);
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
  async update(@Param('id') id: string, @Body() updateBattleDto: UpdateBattleDto): Promise<Battle> {
    return this.battlesService.update(id, updateBattleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.battlesService.remove(id);
  }
}
