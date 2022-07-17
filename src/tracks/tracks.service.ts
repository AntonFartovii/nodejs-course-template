import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Track, TrackEntity } from './tracks.interface';
import { DbService } from '../db/db.service';
import { uuidValidateV4 } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { Album } from '../albums/albums.interface';
import { Artists } from '../artists/artists.interface';

@Injectable()
export class TracksService{
  constructor(
    private db: DbService<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favsService: FavoritesService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    ) {
  }

  getAll() {
    return this.db.findAll()
  }

  getById( id: string ) {

    const item =  this.db.findOne( id )
    if (!item) {
      throw new NotFoundException(HttpStatus.NOT_FOUND)
    }
    return item
  }

  async create( { name, artistId, albumId, duration }: CreateTrackDto ) {
    const newItem = new TrackEntity({
      "id": uuidv4(),
      "name":  name,
      "artistId":  artistId || null,
      "albumId":  albumId || null,
      "duration":  duration || null
    })
    return this.db.create( newItem )
  }

  async update( { name, artistId, albumId, duration }: CreateTrackDto, id) {

    // 404
    const item = this.db.findOne( id )
    if ( !item ) {
      throw new HttpException ('NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    // 403 200
    const newItem = new TrackEntity({
      "id": id,
      "name":  name,
      "artistId":  artistId,
      "albumId":  albumId,
      "duration":  duration
    })

    return this.db.update( id, newItem )
  }

  remove( id: string ): Track | void {

    const item: Track = this.db.remove( id )

    console.log( item );
    if ( !item ) {
      throw new NotFoundException(HttpStatus.NOT_FOUND)
    }

    this.favsService.removeFrom('tracks', id)
    return item;

  }

  setNullArtist( filter ) {
    // find items that has artistId = filter

    const { artistId } = filter
    const items = this.db.findAll( filter )

    items.forEach( oldItem => {
      const newItem = new TrackEntity({
        "id": oldItem.id,
        "name":  oldItem.name,
        "artistId":  null,
        "albumId":  oldItem.albumId,
        "duration":  oldItem.duration
      })
      this.db.update( oldItem.id, newItem )

    })


  }

  setNullAlbum( filter ) {
    // find items that has artistId = filter

    const { albumId } = filter
    console.log( 'albumId:', albumId );
    const items = this.db.findAll( filter )

    items.forEach( oldItem => {
      const newItem = new TrackEntity({
        "id": oldItem.id,
        "name":  oldItem.name,
        "artistId":  oldItem.artistId,
        "albumId":  null,
        "duration":  oldItem.duration
      })
      console.log( 'newItem:', newItem );
      this.db.update( oldItem.id, newItem )

    })


  }
}

