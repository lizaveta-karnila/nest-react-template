import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  username?: string | null;
}
