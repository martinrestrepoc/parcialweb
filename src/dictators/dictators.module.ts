import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictatorsService } from './dictators.service';
import { DictatorsController } from './dictators.controller';
import { Dictator } from './entities/dictator.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictator]),
    JwtModule, 
  ],
  controllers: [DictatorsController],
  providers: [DictatorsService],
  exports: [DictatorsService],
})
export class DictatorsModule {}
