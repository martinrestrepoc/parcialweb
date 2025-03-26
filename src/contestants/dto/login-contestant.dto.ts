import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginContestantDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(12)
  password: string;
}
