import {Controller, Get, Post, Body, Param, Put, Patch, Delete, UseGuards, } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { CreateDictatorDto } from './dto/create-dictator.dto';
import { UpdateDictatorDto } from './dto/update-dictator.dto';
import { LoginDto } from './dto/login.dto';
import { Dictator } from './entities/dictator.entity';
import { Contestant } from '../contestants/entities/contestant.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dictators')
export class DictatorsController {
  constructor(private readonly dictatorsService: DictatorsService) {}

  // Públicas
  @Post('register')
  async create(@Body() dto: CreateDictatorDto): Promise<Dictator> {
    return this.dictatorsService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.dictatorsService.login(dto);
  }

  // Protegidas
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Get()
  async findAll(): Promise<Dictator[]> {
    return this.dictatorsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dictator> {
    return this.dictatorsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDictatorDto,
  ): Promise<Dictator> {
    return this.dictatorsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Patch(':id/special-event')
  async addEvent(
    @Param('id') id: string,
    @Body() body: { event: string },
  ): Promise<Dictator> {
    return this.dictatorsService.addSpecialEvent(id, body.event);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Get(':id/contestants')
  async findContestants(@Param('id') id: string): Promise<Contestant[]> {
    return this.dictatorsService.findContestants(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('dictator')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.dictatorsService.remove(id);
  }
}
