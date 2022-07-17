import { Track } from '../tracks/tracks.interface';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumEntity {
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}