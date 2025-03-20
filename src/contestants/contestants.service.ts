import { Injectable } from '@nestjs/common';
import { CreateContestantDto } from './dto/create-contestant.dto';
import { UpdateContestantDto } from './dto/update-contestant.dto';

@Injectable()
export class ContestantsService {
  create(createContestantDto: CreateContestantDto) {
    return 'This action adds a new contestant';
  }

  findAll() {
    return `This action returns all contestants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contestant`;
  }

  update(id: number, updateContestantDto: UpdateContestantDto) {
    return `This action updates a #${id} contestant`;
  }

  remove(id: number) {
    return `This action removes a #${id} contestant`;
  }
}
