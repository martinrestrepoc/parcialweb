import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { ContestantsService } from './contestants.service';
import { Contestant } from './entities/contestant.entity';

@Controller('contestants')
export class ContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  @Post()
  create(@Body() contestant: Contestant) {
    return this.contestantsService.create(contestant);
  }

  @Get()
  findAll(): Promise<Contestant[]> {
    return this.contestantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contestant> {
    return this.contestantsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() contestant: Contestant): Promise<Contestant> {
    return this.contestantsService.update(id, contestant);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contestantsService.remove(id);
  }

  // PATCH para cambiar solo el status (Free, Dead, Escaped, Alive)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: Contestant['status'] }
  ): Promise<Contestant> {
    return this.contestantsService.updateStatus(id, body.status);
  }

  // PATCH para registrar una victoria o derrota
  @Patch(':id/battle')
  registerBattle(
    @Param('id') id: string,
    @Body() body: { result: 'win' | 'loss' }
  ): Promise<Contestant> {
    return this.contestantsService.registerBattleResult(id, body.result);
  }
}