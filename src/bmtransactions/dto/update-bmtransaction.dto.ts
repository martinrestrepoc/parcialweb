import { PartialType } from '@nestjs/mapped-types';
import { CreateBmTransactionDto } from './create-bmtransaction.dto';

export class UpdateBmTransactionDto extends PartialType(CreateBmTransactionDto) {}
