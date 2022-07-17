import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { Artists } from '../artists/artists.interface';
import { CreateArtistsDto } from '../artists/dto/create-artists.dto';
import { AlbumsService } from './albums.service';
import { Album } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Album[] {
    return this.albumsService.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string): Album {
    return this.albumsService.getById( id )
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create( createAlbumDto )
  }


  @Put(':id')
  update(
    @Body() createAlbumDto: CreateAlbumDto,
    @Param('id', new ParseUUIDPipe({ version: '4'})) id:string) {
    return this.albumsService.update( createAlbumDto, id )
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string ): Album | void  {
    return  this.albumsService.remove( id )
  }
}
