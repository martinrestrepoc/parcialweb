import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contestant } from './entities/contestant.entity';
import { ContestantsService } from './contestants.service';
import { ContestantsController } from './contestants.controller';
import { Dictator } from '../dictators/entities/dictator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contestant, Dictator])],  
  providers: [ContestantsService],
  controllers: [ContestantsController],
})
export class ContestantsModule {}