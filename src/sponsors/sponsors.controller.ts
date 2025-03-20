import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { Sponsor } from './entities/sponsor.entity';

@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  async create(@Body() sponsor: Sponsor): Promise<Sponsor> {
    return this.sponsorsService.create(sponsor);
  }

  @Get()
  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sponsor> {
    return this.sponsorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() sponsor: Sponsor): Promise<Sponsor> {
    return this.sponsorsService.update(id, sponsor);
  }
}