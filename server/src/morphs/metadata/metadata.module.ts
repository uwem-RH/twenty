import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetadataService } from './metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([], 'metadata')],
  providers: [MetadataService],
})
export class MetadataModule {}
