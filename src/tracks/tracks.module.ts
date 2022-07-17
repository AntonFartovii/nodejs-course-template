import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { DbService } from '../db/db.service';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [TracksController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  providers: [TracksService, DbService],
  exports: [TracksService]
})
export class TracksModule {}


