import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { Sponsor } from './entities/sponsor.entity';
import { JwtModule } from '@nestjs/jwt';
import { BmTransactionsService } from '../bmtransactions/bmtransactions.service';
import { BmTransaction } from '../bmtransactions/entities/bmtransaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sponsor, BmTransaction]),
    JwtModule, 
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService, BmTransactionsService],
})
export class SponsorsModule {}
