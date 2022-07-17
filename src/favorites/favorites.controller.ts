import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.favoritesService.getAll()
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.add( 'tracks', id )
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.remove( 'tracks', id )
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.add( 'albums', id )
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.remove( 'albums', id )
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.add( 'artists', id )
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.favoritesService.remove( 'artists', id )
  }

}
