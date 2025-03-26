import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contestant } from './entities/contestant.entity';
import { Dictator } from '../dictators/entities/dictator.entity';
import { CreateContestantDto } from './dto/create-contestant.dto';
import { UpdateContestantDto } from './dto/update-contestant.dto';
import { LoginContestantDto } from './dto/login-contestant.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ContestantsService {
  constructor(
    @InjectRepository(Contestant)
    private contestantsRepository: Repository<Contestant>,
    @InjectRepository(Dictator)
    private dictatorsRepository: Repository<Dictator>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateContestantDto): Promise<Contestant> {
    const dictator = await this.dictatorsRepository.findOneBy({ id: dto.dictatorId });
    if (!dictator) throw new NotFoundException(`Dictator with ID ${dto.dictatorId} not found`);

    const contestant = this.contestantsRepository.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10),
      rank: this.calculateRank(dto.wins, dto.losses),
      role: 'contestant',
      dictator,
    });

    return this.contestantsRepository.save(contestant);
  }

  async login(dto: LoginContestantDto): Promise<{ token: string }> {
    const contestant = await this.contestantsRepository.findOneBy({ email: dto.email });
    if (!contestant) throw new NotFoundException('Invalid credentials');

    const isValid = bcrypt.compareSync(dto.password, contestant.password);
    if (!isValid) throw new NotFoundException('Invalid credentials');

    const payload = { email: contestant.email, role: contestant.role, sub: contestant.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    
    return { token };
  }

  async findAll(): Promise<Contestant[]> {
    return this.contestantsRepository.find({ relations: ['dictator'] });
  }

  async findOne(id: string): Promise<Contestant> {
    const contestant = await this.contestantsRepository.findOneBy({ id });
    if (!contestant) throw new NotFoundException(`Contestant with ID ${id} not found`);
    return contestant;
  }

  async update(id: string, dto: UpdateContestantDto): Promise<Contestant> {
    const existing = await this.findOne(id);
    const updated = { ...existing, ...dto };
    updated.rank = this.calculateRank(updated.wins, updated.losses);
    await this.contestantsRepository.save(updated);
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.contestantsRepository.delete(id);
  }

  private calculateRank(wins: number, losses: number): string {
    if (wins >= 10) return 'Killing Machine';
    if (wins >= 5) return 'Mediocre Fighter';
    return 'Coward';
  }

  async updateStatus(id: string, status: 'Alive' | 'Dead' | 'Escaped' | 'Free'): Promise<Contestant> {
    const contestant = await this.findOne(id);
    contestant.status = status;
    return this.contestantsRepository.save(contestant);
  }

  async registerBattleResult(id: string, result: 'win' | 'loss'): Promise<Contestant> {
    const contestant = await this.findOne(id);
    if (result === 'win') contestant.wins++;
    else contestant.losses++;
    contestant.rank = this.calculateRank(contestant.wins, contestant.losses);
    return this.contestantsRepository.save(contestant);
  }
}
