import { Get, Post, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Controller, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateArtistsDto } from './dto/create-artists.dto';
import { ArtistsService } from './artists.service';
import { Artists } from './artists.interface';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Artists[] {
    return this.artistsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArtistsDto: CreateArtistsDto,
  ): Promise<Artists | void> {
    return await this.artistsService.create(createArtistsDto);
  }

  @Put(':id')
  async update(
    @Body() createArtistsDto: CreateArtistsDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artists | string> {
    return this.artistsService.update(createArtistsDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artists | void {
    return this.artistsService.remove(id);
  }
}
