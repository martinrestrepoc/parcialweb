import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorsRepository: Repository<Sponsor>,
  ) {}

  async create(sponsor: Sponsor): Promise<Sponsor> {
    return this.sponsorsRepository.save(sponsor);
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsRepository.find();
  }

  async findOne(id: string): Promise<Sponsor> {
    const sponsor = await this.sponsorsRepository.findOneBy({ id });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return sponsor;
  }

  async update(id: string, sponsor: Sponsor): Promise<Sponsor> {
    const existingSponsor = await this.sponsorsRepository.findOneBy({ id });
    if (!existingSponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    await this.sponsorsRepository.update(id, sponsor);
    const updatedSponsor = await this.sponsorsRepository.findOneBy({ id });
    if (!updatedSponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return updatedSponsor;
  }
}