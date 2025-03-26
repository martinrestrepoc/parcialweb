import { IsString, IsInt, Min, Max, IsArray, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateDictatorDto {
  @IsString()
  name: string;

  @IsString()
  territory: string;

  @IsInt()
  @Min(0)
  number_of_slaves: number;

  @IsInt()
  @Min(1)
  @Max(100)
  loyalty_to_Carolina: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(12)
  password: string;

  @IsArray()
  @IsOptional()
  special_events?: string[];
}
