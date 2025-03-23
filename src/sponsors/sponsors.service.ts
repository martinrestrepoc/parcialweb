import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { BmTransactionsService } from '../bmtransactions/bmtransactions.service';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorsRepository: Repository<Sponsor>,
    private bmtransactionsService: BmTransactionsService,
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

  // ✅ Donar un ítem al concursante preferido y registrar la transacción en el mercado negro
  async donateItem(sponsorId: string, item: string): Promise<string> {
    const sponsor = await this.findOne(sponsorId);

    sponsor.donated_items += sponsor.donated_items ? `, ${item}` : item;
    await this.sponsorsRepository.save(sponsor);

    await this.bmtransactionsService.create({
      buyer_id: sponsor.preferred_fighter,
      seller_id: sponsor.id,
      item,
      amount: 0,
      status: 'Completed',
    });

    return `Donación de "${item}" registrada correctamente para el concursante ${sponsor.preferred_fighter}`;
  }
}