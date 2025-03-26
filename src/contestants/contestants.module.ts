import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestantsService } from './contestants.service';
import { ContestantsController } from './contestants.controller';
import { Contestant } from './entities/contestant.entity';
import { Dictator } from '../dictators/entities/dictator.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contestant, Dictator]),
    JwtModule, 
  ],
  controllers: [ContestantsController],
  providers: [ContestantsService],
})
export class ContestantsModule {}
