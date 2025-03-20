import { PartialType } from '@nestjs/mapped-types';
import { CreateBmtransactionDto } from './create-bmtransaction.dto';

export class UpdateBmtransactionDto extends PartialType(CreateBmtransactionDto) {}
