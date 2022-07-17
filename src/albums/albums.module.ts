import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { DbService } from '../db/db.service';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule)
  ],
  providers: [AlbumsService, DbService],
  exports: [AlbumsService]
})
export class AlbumsModule {}
