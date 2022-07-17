import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArtistsDto {

  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string

  @IsBoolean()
  grammy: boolean
}