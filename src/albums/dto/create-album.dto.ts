import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateAlbumDto {
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
