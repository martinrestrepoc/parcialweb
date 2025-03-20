import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contestant } from './entities/contestant.entity';

@Injectable()
export class ContestantsService {
  constructor(
    @InjectRepository(Contestant)
    private contestantsRepository: Repository<Contestant>,
  ) {}

  // Crear un nuevo concursante
  async create(contestant: Contestant): Promise<Contestant> {
    return this.contestantsRepository.save(contestant); // Guardamos y devolvemos el objeto creado
  }

  // Obtener todos los concursantes
  async findAll(): Promise<Contestant[]> {
    return this.contestantsRepository.find(); // Devolvemos un array de Contestants
  }

  // Obtener un concursante por su ID
  async findOne(id: string): Promise<Contestant> {
    const contestant = await this.contestantsRepository.findOneBy({ id });
    if (!contestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`); // Lanzamos una excepción si no se encuentra
    }
    return contestant; // Devolvemos el concursante encontrado
  }

  // Actualizar un concursante
  async update(id: string, contestant: Contestant): Promise<Contestant> {
    const existingContestant = await this.contestantsRepository.findOneBy({ id });
    if (!existingContestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
    await this.contestantsRepository.update(id, contestant); // Actualizamos el objeto
    const updatedContestant = await this.contestantsRepository.findOneBy({ id });
    if (!updatedContestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
    return updatedContestant; // Devolvemos el objeto actualizado
  }

  // Eliminar un concursante
  async remove(id: string): Promise<void> {
    const contestant = await this.contestantsRepository.findOneBy({id});
    if (!contestant) {
      throw new NotFoundException(`Contestant with ID ${id} not found`);
    }
    await this.contestantsRepository.delete(id); // Eliminamos el objeto
  }
}