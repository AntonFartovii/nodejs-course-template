import { IsString, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsOptional()
  duration: number; // integer number
}