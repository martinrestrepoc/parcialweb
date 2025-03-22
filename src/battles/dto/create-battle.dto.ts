import { IsUUID, IsBoolean, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBattleDto {
  @IsUUID()
  contestant_1: string;

  @IsUUID()
  contestant_2: string;

  @IsUUID()
  @IsOptional()
  winner_id?: string;

  @IsBoolean()
  death_occurred: boolean;

  @IsString()
  injuries: string;

  @IsInt()
  date: number;
}
