import { Track } from '../tracks/tracks.interface';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface Artists {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
export class ArtistEntity {
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(partial: Partial<Artists>) {
    Object.assign(this, partial);
  }
}
