import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private battlesRepository: Repository<Battle>,
  ) {}

  async create(battle: Battle): Promise<Battle> {
    return this.battlesRepository.save(battle);
  }

  async findAll(): Promise<Battle[]> {
    return this.battlesRepository.find();
  }

  async findOne(id: string): Promise<Battle> {
    const battle = await this.battlesRepository.findOneBy({ id });
    if (!battle) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }
    return battle;
  }

  async update(id: string, battle: Battle): Promise<Battle> {
    const existingBattle = await this.battlesRepository.findOneBy({ id });
    if (!existingBattle) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }
    await this.battlesRepository.update(id, battle);
    const updatedBattle = await this.battlesRepository.findOneBy({ id });
    if (!updatedBattle) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }
    return updatedBattle;
  }
}