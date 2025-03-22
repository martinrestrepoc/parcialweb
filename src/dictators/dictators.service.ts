import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictator } from './entities/dictator.entity';
import { Contestant } from '../contestants/entities/contestant.entity';

@Injectable()
export class DictatorsService {
  constructor(
    @InjectRepository(Dictator)
    private dictatorsRepository: Repository<Dictator>,
  ) {}

  async create(dictator: Dictator): Promise<Dictator> {
    return this.dictatorsRepository.save(dictator);
  }

  async findAll(): Promise<Dictator[]> {
    return this.dictatorsRepository.find();
  }

  async findOne(id: string): Promise<Dictator> {
    const dictator = await this.dictatorsRepository.findOneBy({ id });
    if (!dictator) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    return dictator;
  }

  async update(id: string, dictator: Dictator): Promise<Dictator> {
    const existing = await this.dictatorsRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    await this.dictatorsRepository.update(id, dictator);
    const updated = await this.dictatorsRepository.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    return updated;
  }

  async findContestants(id: string): Promise<Contestant[]> {
    const dictator = await this.dictatorsRepository.findOne({
      where: { id },
      relations: ['contestants'],
    });
    if (!dictator) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    return dictator.contestants;
  }

  async addSpecialEvent(id: string, event: string): Promise<Dictator> {
    const dictator = await this.findOne(id);
    dictator.special_events.push(event);
    return this.dictatorsRepository.save(dictator);
  }
}