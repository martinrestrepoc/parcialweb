import { IsString, IsUUID, IsEmail, MinLength } from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  company_name: string;

  @IsString()
  donated_items: string;

  @IsUUID()
  preferred_fighter: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(12)
  password: string;
}
