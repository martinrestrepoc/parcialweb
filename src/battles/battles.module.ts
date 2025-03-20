import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';
import { Battle } from './entities/battle.entity'; // Asegúrate de importar la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Battle])], // Registra el repositorio de Battle
  providers: [BattlesService],
  controllers: [BattlesController],
})
export class BattlesModule {}