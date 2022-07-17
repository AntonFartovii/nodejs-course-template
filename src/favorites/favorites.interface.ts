import { Track } from '../tracks/tracks.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesEntity {
  artist: string[]; // favorite artists ids
  album: string[]; // favorite albums ids
  track: string[]; // favorite tracks ids

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}