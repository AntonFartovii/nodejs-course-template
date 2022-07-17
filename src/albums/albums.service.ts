import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Album, AlbumEntity } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AlbumsService {

  constructor(
    private db: DbService<Album>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favsService: FavoritesService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService) {
  }

  getAll() {
    return this.db.findAll()
  }

  getById( id: string ) {
    const item: Album =  this.db.findOne( id )
    if (!item) {
      throw new NotFoundException(HttpStatus.NOT_FOUND)
    }
    return item
  }

  async create( { name, year, artistId }: CreateAlbumDto ) {

    const newItem = new AlbumEntity({
      "id": uuidv4(),
      "name":  name,
      "year": year,
      "artistId":  artistId || null
    })

    return this.db.create( newItem )
  }

  remove( id: string ): Album | void  {

    console.log( 'album id: ', id );
    const item: Album = this.db.remove( id )

    console.log( item );
    if ( !item ) {
      throw new NotFoundException(HttpStatus.NOT_FOUND)
    }

    this.tracksService.setNullAlbum({ albumId: id });
    this.favsService.removeFrom( 'albums', id )

    return item;
  }

  update( createAlbumDto: CreateAlbumDto, id: string ) {

    const item = this.db.findOne( id )
    if ( !item ) {
      throw new HttpException ('NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    // 403 200
    const newItem = new AlbumEntity({
      "id": item.id,
      ...createAlbumDto
    })


    return this.db.update( id, newItem )
  }

  setNullArtist( filter ) {
    // find items that has artistId = filter

    const { artistId } = filter
    const items = this.db.findAll( filter )

    items.forEach( oldItem => {
      const updateItem = new AlbumEntity({
        "id": oldItem.id,
        "name":  oldItem.name,
        "year": oldItem.year,
        "artistId":  null,
      })
      this.db.update( oldItem.id, updateItem )

    })


  }
}
