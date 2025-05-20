import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../roles/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

 @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}
