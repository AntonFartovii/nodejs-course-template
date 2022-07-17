import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  id: any;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
