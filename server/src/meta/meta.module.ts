import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { YogaDriverConfig, YogaDriver } from '@graphql-yoga/nestjs';
import GraphQLJSON from 'graphql-type-json';

import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: YogaDriver,
      autoSchemaFile: true,
      include: [MetaModule],
      resolvers: { JSON: GraphQLJSON },
      plugins: [],
      path: '/meta',
    }),
    FavoriteModule,
  ],
})
export class MetaModule {}
