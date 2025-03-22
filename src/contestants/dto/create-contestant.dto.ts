import { IsString, IsNumber, IsEnum, IsUUID, Min, Max } from 'class-validator';

export class CreateContestantDto {
  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  origin: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  strength: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  agility: number;

  @IsNumber()
  @Min(0)
  wins: number;

  @IsNumber()
  @Min(0)
  losses: number;

  @IsEnum(['Alive', 'Dead', 'Escaped', 'Free'])
  status: 'Alive' | 'Dead' | 'Escaped' | 'Free';

  @IsUUID()
  dictatorId: string;
}
