import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
