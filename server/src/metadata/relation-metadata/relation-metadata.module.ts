import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationMetadata } from './relation-metadata.entity';

import { RelationMetadataService } from './services/relation-metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([RelationMetadata], 'metadata')],
  providers: [RelationMetadataService],
  exports: [RelationMetadataService],
})
export class ObjectMetadataModule {}
