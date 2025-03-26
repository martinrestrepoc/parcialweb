import {Controller, Get, Post, Body, Param, Put, Patch, UseGuards,
} from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { LoginDto } from './dto/login.dto';
import { Sponsor } from './entities/sponsor.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  // Rutas públicas
  @Post('register')
  async create(@Body() dto: CreateSponsorDto): Promise<Sponsor> {
    return this.sponsorsService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.sponsorsService.login(dto);
  }

  // Rutas protegidas para sponsor
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('sponsor')
  @Get()
  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('sponsor')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sponsor> {
    return this.sponsorsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('sponsor')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<Sponsor>,
  ): Promise<Sponsor> {
    return this.sponsorsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('sponsor')
  @Patch(':id/donate')
  async donateItem(
    @Param('id') sponsorId: string,
    @Body() body: { item: string },
  ): Promise<string> {
    return this.sponsorsService.donateItem(sponsorId, body.item);
  }
}
