import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictator } from './entities/dictator.entity';
import { DictatorsService } from './dictators.service';
import { DictatorsController } from './dictators.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dictator])],  // Inyección del repositorio de Dictator
  providers: [DictatorsService],
  controllers: [DictatorsController],
})
export class DictatorsModule {}