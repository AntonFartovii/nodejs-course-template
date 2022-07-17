import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { ArtistEntity, Artists } from './artists.interface';
import { DbService } from '../db/db.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(
    private db: DbService<Artists>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}
  getAll() {
    return this.db.findAll();
  }

  getById(id) {
    const item: Artists = this.db.findOne(id);
    if (!item) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async create({ name, grammy }: CreateArtistsDto) {
    const newItem = new ArtistEntity({
      id: uuidv4(),
      name: name,
      grammy: grammy || null,
    });

    return this.db.create(newItem);
  }

  update({ name, grammy }: CreateArtistsDto, id) {
    // 404
    const item = this.db.findOne(id);
    if (!item) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // 403 200
    const newItem = new ArtistEntity({
      id: uuidv4(),
      name: name,
      grammy: grammy,
    });

    this.db.remove(id);

    return this.db.create(newItem);
  }

  remove(id: string): Artists | void {
    const item: Artists = this.db.remove(id);

    console.log(item);
    if (!item) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    }

    this.tracksService.setNullArtist({ artistId: id });
    this.albumsService.setNullArtist({ artistId: id });
    this.favoritesService.removeFrom('artists', id);

    return item;
  }
}
