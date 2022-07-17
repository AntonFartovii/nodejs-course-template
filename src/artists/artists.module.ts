import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DbService } from '../db/db.service';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  providers: [ArtistsService, DbService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
