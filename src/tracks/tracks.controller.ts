import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './tracks.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { Artists } from '../artists/artists.interface';

@Controller('track')
export class TracksController {
  constructor(
    private trackService: TracksService ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Track[]> {
    return this.trackService.getAll()
  }

  @Get(':id')
  async getOne
    (@Param('id', new ParseUUIDPipe({ version: '4'})) id: string) {
    return this.trackService.getById( id )
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTrackDto: CreateTrackDto): Promise<Track | void> {
    return await this.trackService.create( createTrackDto )
  }

  @Put(':id')
  async update(
    @Body() createTrackDto: CreateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: '4'})) id: string): Promise<Track | string> {
    return await this.trackService.update( createTrackDto, id )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4'})) id:string): Track | void {
    return this.trackService.remove( id )
  }


}
