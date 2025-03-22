import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { ContestantsService } from './contestants.service';
import { CreateContestantDto } from './dto/create-contestant.dto';
import { UpdateContestantDto } from './dto/update-contestant.dto';

@Controller('contestants')
export class ContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  // ✅ Create a new contestant with DTO validation
  @Post()
  create(@Body() createContestantDto: CreateContestantDto) {
    return this.contestantsService.create(createContestantDto, createContestantDto.dictatorId);
  }

  // ✅ Get all contestants
  @Get()
  findAll() {
    return this.contestantsService.findAll();
  }

  // ✅ Get a single contestant by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestantsService.findOne(id);
  }

  // ✅ Update contestant details (requires all fields)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateContestantDto: UpdateContestantDto) {
    return this.contestantsService.update(id, updateContestantDto);
  }

  // ✅ Delete a contestant
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestantsService.remove(id);
  }

  // ✅ PATCH: Update only the status (Alive, Dead, Escaped, Free)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: 'Alive' | 'Dead' | 'Escaped' | 'Free' }) {
    return this.contestantsService.updateStatus(id, body.status);
  }
  

  // ✅ PATCH: Register a win or loss
  @Patch(':id/battle')
  registerBattle(@Param('id') id: string, @Body('result') result: 'win' | 'loss') {
    return this.contestantsService.registerBattleResult(id, result);
  }
}
