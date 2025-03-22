import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private battlesRepository: Repository<Battle>,
  ) {}

  async create(createBattleDto: CreateBattleDto): Promise<Battle> {
    const battle = this.battlesRepository.create({
      ...createBattleDto,
      date: Date.now(), // Ensure timestamp is generated on creation
    });
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

  async update(id: string, updateBattleDto: UpdateBattleDto): Promise<Battle> {
    const existingBattle = await this.battlesRepository.findOneBy({ id });
    if (!existingBattle) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }

    await this.battlesRepository.update(id, updateBattleDto);
    return this.findOne(id); // Return updated battle
  }

  async remove(id: string): Promise<void> {
    const battle = await this.battlesRepository.findOneBy({ id });
    if (!battle) {
      throw new NotFoundException(`Battle with ID ${id} not found`);
    }
    await this.battlesRepository.delete(id);
  }
}
