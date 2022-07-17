import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { DbService } from '../db/db.service';
import { Track } from '../tracks/tracks.interface';
import { Favorites } from './favorites.interface';
import { Album } from '../albums/albums.interface';
import { Artists } from '../artists/artists.interface';

@Injectable()
export class FavoritesService {
  private db: string[] = [];
  private readonly inMemoryStore: Favorites;
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => DbService))
    private favsDb: [],
  ) {
    this.inMemoryStore = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  getAll() {
    const artists: Artists[] = this.artistsService.getAll();

    const albums: Album[] = this.albumsService.getAll();

    const tracks: Track[] = this.tracksService.getAll();

    return {
      albums,
      tracks,
      artists,
    };
  }
  add(arg, id) {
    this.inMemoryStore[arg] = this.inMemoryStore[arg] || [];

    if (arg === 'tracks') {
      try {
        this.tracksService.getById(id);
      } catch {
        throw new UnprocessableEntityException(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } else if (arg === 'albums') {
      try {
        this.albumsService.getById(id);
      } catch {
        throw new UnprocessableEntityException(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } else if (arg === 'artists') {
      try {
        this.artistsService.getById(id);
      } catch {
        throw new UnprocessableEntityException(HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }

    if (!this.inMemoryStore[arg].includes(id)) {
      this.inMemoryStore[arg].push(id);
    }
    console.log(arg, ' : ', this.inMemoryStore[arg]);
  }

  remove(arg, id) {
    this.inMemoryStore[arg] = this.inMemoryStore[arg] || [];
    // 204 if the track was in favorites and now it's deleted id is found and deleted
    // 400 and corresponding message if trackId is invalid (not uuid)
    // 404 and corresponding message if corresponding track is not favorite

    console.log('this.inMemoryStore', this.inMemoryStore);
    console.log('this.inMemoryStore[arg]', this.inMemoryStore[arg]);

    if (!this.inMemoryStore[arg].includes(id)) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }

    const newArray = this.inMemoryStore[arg].filter((value) => value !== id);

    this.inMemoryStore[arg] = newArray;

    console.log(`new ${arg} :`, this.inMemoryStore[arg]);
  }

  removeFrom(arg, id) {
    this.inMemoryStore[arg] = this.inMemoryStore[arg] || [];

    if (this.inMemoryStore[arg].includes(id)) {
      this.inMemoryStore[arg] = this.inMemoryStore[arg].filter(
        (value) => value !== id,
      );
    }
  }
}
