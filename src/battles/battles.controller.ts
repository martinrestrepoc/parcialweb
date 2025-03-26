import {Controller, Get, Post, Body, Param, Put, Patch, UseGuards} from '@nestjs/common';
import { BattlesService } from './battles.service';
import { Battle } from './entities/battle.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('battles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('dictator', 'contestant') // ambas entidades pueden acceder
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

  @Patch(':id/bet')
  async addBet(
    @Param('id') id: string,
    @Body() body: { dictatorId: string },
  ): Promise<Battle> {
    return this.battlesService.addBet(id, body.dictatorId);
  }
}
