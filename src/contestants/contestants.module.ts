import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contestant } from './entities/contestant.entity';
import { ContestantsService } from './contestants.service';
import { ContestantsController } from './contestants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contestant])],  
  providers: [ContestantsService],
  controllers: [ContestantsController],
})
export class ContestantsModule {}