import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sponsor])],  // Inyección del repositorio de Sponsor
  providers: [SponsorsService],
  controllers: [SponsorsController],
})
export class SponsorsModule {}