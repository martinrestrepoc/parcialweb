import {Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards} from '@nestjs/common';
import { ContestantsService } from './contestants.service';
import { CreateContestantDto } from './dto/create-contestant.dto';
import { UpdateContestantDto } from './dto/update-contestant.dto';
import { LoginContestantDto } from './dto/login-contestant.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('contestants')
export class ContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  // Rutas públicas
  @Post('register')
  create(@Body() dto: CreateContestantDto) {
    return this.contestantsService.create(dto);
  }

  @Post('login')
  login(@Body() dto: LoginContestantDto) {
    return this.contestantsService.login(dto);
  }

  // Rutas protegidas para contestant
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Get()
  findAll() {
    return this.contestantsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestantsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContestantDto) {
    return this.contestantsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestantsService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'Alive' | 'Dead' | 'Escaped' | 'Free' },
  ) {
    return this.contestantsService.updateStatus(id, body.status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('contestant')
  @Patch(':id/battle')
  registerBattle(
    @Param('id') id: string,
    @Body('result') result: 'win' | 'loss',
  ) {
    return this.contestantsService.registerBattleResult(id, result);
  }
}
