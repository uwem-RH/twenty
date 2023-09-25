import { Module } from '@nestjs/common';

import { ObjectMetadataService } from './object-metadata.service';

@Module({
  providers: [ObjectMetadataService],
  exports: [ObjectMetadataService],
})
export class ObjectMetadataModule {}
