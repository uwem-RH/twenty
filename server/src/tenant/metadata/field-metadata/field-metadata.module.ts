import { Module } from '@nestjs/common';

import { FieldMetadataService } from './field-metadata.service';

@Module({
  providers: [FieldMetadataService],
  exports: [FieldMetadataService],
})
export class FieldMetadataModule {}
