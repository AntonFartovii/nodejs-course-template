import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class TrackEntity {
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

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
