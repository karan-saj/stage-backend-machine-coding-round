import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserSchema } from '../models/user.schema';
import { TVShow, TVShowSchema } from '../models/tvshow.schema';
import { Movie, MovieSchema } from '../models/movie.schema';

@Module({
  imports: [
    // Make sure MongooseModule is imported with the necessary models
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TVShow.name, schema: TVShowSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
