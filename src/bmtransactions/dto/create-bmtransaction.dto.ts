import { IsUUID, IsString, IsDecimal, IsEnum } from 'class-validator';

export class CreateBmTransactionDto {
  @IsUUID()
  buyer_id: string;

  @IsUUID()
  seller_id: string;

  @IsString()
  item: string;

  @IsDecimal()
  amount: number;

  @IsEnum(['Completed', 'Failed', 'Discovered'])
  status: 'Completed' | 'Failed' | 'Discovered';
}
