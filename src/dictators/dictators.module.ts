import { Module } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { DictatorsController } from './dictators.controller';

@Module({
  controllers: [DictatorsController],
  providers: [DictatorsService],
})
export class DictatorsModule {}
