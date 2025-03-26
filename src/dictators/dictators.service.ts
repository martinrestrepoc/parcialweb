import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictator } from './entities/dictator.entity';
import { Contestant } from '../contestants/entities/contestant.entity';
import { CreateDictatorDto } from './dto/create-dictator.dto';
import { UpdateDictatorDto } from './dto/update-dictator.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DictatorsService {
  constructor(
    @InjectRepository(Dictator)
    private dictatorsRepository: Repository<Dictator>,
    private jwtService: JwtService,
  ) {}

  async create(createDictatorDto: CreateDictatorDto): Promise<Dictator> {
    const hashedPassword = bcrypt.hashSync(createDictatorDto.password, 10);
    const dictator = this.dictatorsRepository.create({
      ...createDictatorDto,
      password: hashedPassword,
      role: 'dictator',
    });
    return this.dictatorsRepository.save(dictator);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const dictator = await this.dictatorsRepository.findOneBy({ email: loginDto.email });
    if (!dictator) throw new NotFoundException('Invalid credentials');

    const isValid = bcrypt.compareSync(loginDto.password, dictator.password);
    if (!isValid) throw new NotFoundException('Invalid credentials');

    const payload = { email: dictator.email, role: dictator.role, sub: dictator.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    
    return { token };
  }

  async findAll(): Promise<Dictator[]> {
    return this.dictatorsRepository.find();
  }

  async findOne(id: string): Promise<Dictator> {
    const dictator = await this.dictatorsRepository.findOne({
      where: { id },
      relations: ['contestants'],
    });
    if (!dictator) throw new NotFoundException(`Dictator with ID ${id} not found`);
    return dictator;
  }

  async update(id: string, updateDictatorDto: UpdateDictatorDto): Promise<Dictator> {
    await this.dictatorsRepository.update(id, updateDictatorDto);
    return this.findOne(id);
  }

  async findContestants(id: string): Promise<Contestant[]> {
    const dictator = await this.findOne(id);
    return dictator.contestants;
  }

  async addSpecialEvent(id: string, event: string): Promise<Dictator> {
    const dictator = await this.findOne(id);
    dictator.special_events = [...dictator.special_events, event];
    return this.dictatorsRepository.save(dictator);
  }

  async remove(id: string): Promise<void> {
    const dictator = await this.findOne(id);
    await this.dictatorsRepository.delete(id);
  }
}
