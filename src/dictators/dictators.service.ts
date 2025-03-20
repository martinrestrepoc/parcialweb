import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictator } from './entities/dictator.entity';

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
    const existingDictator = await this.dictatorsRepository.findOneBy({ id });
    if (!existingDictator) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    await this.dictatorsRepository.update(id, dictator);
    const updatedDictator = await this.dictatorsRepository.findOneBy({ id });
    if (!updatedDictator) {
      throw new NotFoundException(`Dictator with ID ${id} not found`);
    }
    return updatedDictator;
  }
}