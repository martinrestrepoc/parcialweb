import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contestant } from './entities/contestant.entity';
import { Dictator } from '../dictators/entities/dictator.entity';
import { CreateContestantDto } from './dto/create-contestant.dto';
import { UpdateContestantDto } from './dto/update-contestant.dto';


@Injectable()
export class ContestantsService {
  constructor(
    @InjectRepository(Contestant)
    private contestantsRepository: Repository<Contestant>,
    @InjectRepository(Dictator)
    private dictatorsRepository: Repository<Dictator>,
  ) {}

  // Crear un nuevo concursante
  async create(createContestantDto: CreateContestantDto, dictatorId: string): Promise<Contestant> {
    const dictator = await this.dictatorsRepository.findOneBy({ id: dictatorId });
    if (!dictator) throw new NotFoundException(`Dictator with ID ${dictatorId} not found`);
  
    // crea un nuevo concursante con el dto
    const contestant = this.contestantsRepository.create(createContestantDto);
    contestant.dictator = dictator;
    contestant.rank = this.calculateRank(contestant.wins, contestant.losses);
    
    return this.contestantsRepository.save(contestant);
  }
  

  // Obtener todos los concursantes
  async findAll(): Promise<Contestant[]> {
    return this.contestantsRepository.find({ relations: ['dictator'] });
  }
  

  // Obtener un concursante por su ID
  async findOne(id: string): Promise<Contestant> {
    const contestant = await this.contestantsRepository.findOneBy({ id });
    if (!contestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
    return contestant;
  }

  // Actualizar un concursante
  async update(id: string, updateContestantDto: UpdateContestantDto): Promise<Contestant> {
    const existingContestant = await this.contestantsRepository.findOneBy({ id });
    if (!existingContestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
  
    // recalcula el rank si cambian las wins o las losses
    const updatedContestant = { ...existingContestant, ...updateContestantDto };
    updatedContestant.rank = this.calculateRank(updatedContestant.wins, updatedContestant.losses);
  
    await this.contestantsRepository.save(updatedContestant);
    return updatedContestant;
  }
  

  // Eliminar un concursante
  async remove(id: string): Promise<void> {
    const contestant = await this.contestantsRepository.findOneBy({ id });
    if (!contestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
    await this.contestantsRepository.delete(id);
  }

  // Calcular el rank según wins y losses
  private calculateRank(wins: number, losses: number): string {
    if (wins >= 10) return 'Killing Machine';
    if (wins >= 5) return 'Mediocre Fighter';
    return 'Coward';
  }

  // Actualizar solo el status (Si murió, escapó, etc.)
  async updateStatus(id: string, status: 'Alive' | 'Dead' | 'Escaped' | 'Free'): Promise<Contestant> {
    if (!['Alive', 'Dead', 'Escaped', 'Free'].includes(status)) {
      throw new Error('Invalid status value');
    }
  
    const contestant = await this.findOne(id);
    contestant.status = status;
    await this.contestantsRepository.save(contestant);
    return contestant;
  }
  

  // Incrementar wins o losses según el resultado de batalla
  async registerBattleResult(id: string, result: 'win' | 'loss'): Promise<Contestant> {
    const contestant = await this.findOne(id);
    if (result === 'win') contestant.wins++;
    else contestant.losses++;
    contestant.rank = this.calculateRank(contestant.wins, contestant.losses);
    await this.contestantsRepository.save(contestant);
    return contestant;
  }
}