import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { BmTransactionsService } from '../bmtransactions/bmtransactions.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorsRepository: Repository<Sponsor>,
    private bmtransactionsService: BmTransactionsService,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateSponsorDto): Promise<Sponsor> {
    const sponsor = this.sponsorsRepository.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10),
      role: 'sponsor',
    });
    return this.sponsorsRepository.save(sponsor);
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const sponsor = await this.sponsorsRepository.findOneBy({ email: dto.email });
    if (!sponsor) throw new NotFoundException('Invalid credentials');

    const isValid = bcrypt.compareSync(dto.password, sponsor.password);
    if (!isValid) throw new NotFoundException('Invalid credentials');

    const payload = { email: sponsor.email, role: sponsor.role, sub: sponsor.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    
    return { token };
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsRepository.find();
  }

  async findOne(id: string): Promise<Sponsor> {
    const sponsor = await this.sponsorsRepository.findOneBy({ id });
    if (!sponsor) throw new NotFoundException(`Sponsor with ID ${id} not found`);
    return sponsor;
  }

  async update(id: string, data: Partial<Sponsor>): Promise<Sponsor> {
    await this.sponsorsRepository.update(id, data);
    return this.findOne(id);
  }

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

    return `Donación de "${item}" registrada correctamente`;
  }
}
