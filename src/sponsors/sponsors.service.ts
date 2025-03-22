import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorsRepository: Repository<Sponsor>,
  ) {}

  async create(createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    const sponsor = this.sponsorsRepository.create(createSponsorDto);
    return this.sponsorsRepository.save(sponsor);
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsRepository.find();
  }

  async findOne(id: string): Promise<Sponsor> {
    const sponsor = await this.sponsorsRepository.findOne({
      where: { id },
    });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return sponsor;
  }

  async update(id: string, updateSponsorDto: UpdateSponsorDto): Promise<Sponsor> {
    const existingSponsor = await this.findOne(id);
    await this.sponsorsRepository.update(id, updateSponsorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const sponsor = await this.findOne(id);
    await this.sponsorsRepository.delete(id);
  }
}
