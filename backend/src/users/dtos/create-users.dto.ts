import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  username: string;

  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
  phone: string;

  @IsString()
  @IsOptional()
  role:string='user'

  @IsOptional()
  @IsString()
  address?: string;
}
