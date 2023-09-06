import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLError } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { AppService } from './app.service';

import { CoreModule } from './core/core.module';
import { MorphsModule } from './morphs/morphs.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './health/health.module';
import { AbilityModule } from './ability/ability.module';
import { EnvironmentService } from './integrations/environment/environment.service';

const typeOrmModuleFactory =
  (database?: string) =>
  async (
    environmentService: EnvironmentService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: environmentService.getPGDatabaseUrl(),
      database,
    };
  };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        error.extensions.stacktrace = undefined;
        return error;
      },
      csrfPrevention: false,
    }),
    // Twenty database
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmModuleFactory(),
      inject: [EnvironmentService],
    }),
    // Metadata database
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmModuleFactory('metadata'),
      inject: [EnvironmentService],
      name: 'metadata',
    }),
    PrismaModule,
    HealthModule,
    AbilityModule,
    IntegrationsModule,
    CoreModule,
    MorphsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
