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
    const existing = await this.battlesRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }
    await this.battlesRepository.update(id, battle);
    const updatedBattle = await this.battlesRepository.findOneBy({ id });
    if (!updatedBattle) {
      throw new NotFoundException(`Battle with ID ${id} not found after update`);
    }
    return updatedBattle;
  }

  //  Añadir un dictador a la lista de apuestas
  async addBet(id: string, dictatorId: string): Promise<Battle> {
    const battle = await this.findOne(id);
    if (!battle.bets) battle.bets = [];
    if (!battle.bets.includes(dictatorId)) {
      battle.bets.push(dictatorId);
    }
    return this.battlesRepository.save(battle);
  }
}
