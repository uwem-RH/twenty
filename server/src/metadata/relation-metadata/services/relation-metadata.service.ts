import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';

import { RelationMetadata } from 'src/metadata/relation-metadata/relation-metadata.entity';

@Injectable()
export class RelationMetadataService extends TypeOrmQueryService<RelationMetadata> {
  constructor(
    @InjectRepository(RelationMetadata, 'metadata')
    private readonly relationMetadataRepository: Repository<RelationMetadata>,
  ) {
    super(relationMetadataRepository, { useSoftDelete: true });
  }
}
